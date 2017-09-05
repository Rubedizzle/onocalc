var React = require('react');
var ReactDOM = require('react-dom');

import { autorun, observable, action } from 'mobx';

import {BrowserRouter as Router, Route, Switch, Link, withRouter, Redirect} from 'react-router-dom';

import stores from './stores';

import { Provider, observer } from 'mobx-react';

class App extends React.Component{

  updateState(updatedState){
    this.setState({
      firstName:this.updatedState.firstName,
      lastName:this.updatedState.lastName,
      emailAddress:this.updatedState.emailAddress,
      phoneNumber:this.updatedState.phoneNumber,
      streetAddress:this.updatedState.streetAddress,
      cityName:this.updatedState.cityName,
      province:this.updatedState.province,
      postalCode:this.updatedState.postalCode,
      homeValue:this.updatedState.homeValue,
      totalMortgage:this.updatedState.totalMortgage,
      interestRate:this.updatedState.interestRate,
      termYears:this.updatedState.termYears,
      amortizationPeriod:this.updatedState.amortizationPeriod,
      debts:[]
    });
  }

  render(){
    return (
      <Provider UserStore={stores.userStore} DebtStore={stores.debtStore}>
          <Router>
                  <Switch>
                    <Route exact={true} path={'/calc'} component={Calculator} />
                    <Route path={'/success'} component={Success} />
                    <Route path={'/confirmation'} component={Confirmation} />
                    <Route path={'/'} component={Entry} />
                  </Switch>
          </Router>
      </Provider>
    );
  }
};

class Calculator extends React.Component{

  constructor(){
      super();
      this.state = {
        validated: true
      }
    }

  onSuccess(){
    history.push('./success')
  }

  render(){
    const { validated } = userStore.validated
    console.log('test');
    return (
      <div className="container">
        <div className="innContainer centerText">
            <div className="pure-g">
            <div id="calculator">
              <MainForm success={this.onSuccess}/>
            </div>
          </div>
        </div>
      </div>
    );

  }

}


class Entry extends React.Component{

  constructor(){
      super();
      this.state = {
        initialized: userStore.initialized
      }
    }

  render(){
    return (
<div className="container">
  <div className="innContainer centerText">
    <div className="pure-g">
      <div className="pure-u-1">
            <div className="logo"><img src="../images/logo.jpg" /></div>
            <h2>Airl Financial Savings Calculator</h2>
            <p>Let us help you create an instant summary of the estimated savings between paying off your consumer debts under the existing amortization schedule in comparison to accelerating the repayment of your debts using our program.</p>
            <p></p>
            {this.state.initialized &&
              <Link to={'/calc'}><button className="btn"><i className="fa fa-calculator" aria-hidden="true"></i> Get Started!</button></Link>
            }
      </div>
    </div>
  </div>
</div>
    );

  }

}

class Success extends React.Component{

  render(){
    console.log('success');
    return (
      <div className="container">
        <div className="innContainer centerText">
            <div className="pure-g">
              <div id="success-page">
              <div className="logo"><img src="../images/logo.jpg" /></div>
                <h1>This is how Airl Financial can help!</h1>
                <Summary />
                <ScheduleFollowUp />
              </div>
            </div>
        </div>
      </div>
    );
  }
}

class ScheduleFollowUp extends React.Component{
  constructor(){
      super();
      this.state = {
        fireRedirect: false,
        checkboxState: true
      }
    }

  async handleSubmit(e){
    e.preventDefault();
    var success = await this.add('add');
    console.log(success);
      if (success == true){
        this.setState({ fireRedirect: true });
      }
  }

  toggle(event) {
  this.setState({
    checkboxState: !this.state.checkboxState
  });
  console.log (!this.state.checkboxState + ' switched to ' + this.state.checkboxState);
}

  @action async add(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/text; charset=UTF-8');
    console.log('airl payment sending ' + userStore.airlPayment)
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        first_name: userStore.getField('first_name'),
        last_name: userStore.getField('last_name'),
        phone: userStore.getField('phone'),
        email: userStore.getField('email'),
        address: userStore.getField('address'),
        city: userStore.getField('city'),
        province: userStore.getField('province'),
        postal_code: userStore.getField('postal_code'),
        householdIncome: userStore.getField('income'),
        homeValue: userStore.homeValue,
        totalMortgage: userStore.totalMortgage,
        interestRate: userStore.interestRate,
        termYears: userStore.termYears,
        amortizationPeriod: userStore.amortizationPeriod,
        current_mortgage_payment: userStore.mortgagePayment(),
        current_debt_payment: debtStore.debtMonthlyPayment(),
        airl_new_payment: userStore.getField('airlPayment'),
        debtList: JSON.stringify(debtStore.getDebts())
      })
    };

    var status;
    console.log('The data: ' + options.body);
    const request = new Request('http://www.impaulse.com/airlcalc/api/add', options);
    const response = await fetch(request).then(function(res){
      status = res.status;
      console.log('Response Status:' + status);
      return res.json()
    });
    console.log('the response: ' + JSON.stringify(response));
    data = response['ID'];
    console.log("status: " + status);
    //console.log("response value: " + response.text());
    if (status == 201 || status == 200){
      userStore.setConfID(data);
      return true;
    } else {
      console.log('not 200 - fail');
      return false;
    };
  }

  render(){
    const checkedOrNot = [];
    const { from } = '/'
    const { fireRedirect } = this.state

    return (
      <div id="followUp">
        <form id="submitToAirl" className="pure-form" onSubmit={this.handleSubmit.bind(this)}>
          <input type="checkbox" name="agreedToFollowUp" ref="agreedToFollowUp" onClick={this.toggle.bind(this)} />
          <label>&nbsp;I would like an Airl Financial representative to follow-up with me.</label><br /><br />
          <button disabled={this.state.checkboxState} type="submit" value="Submit to Airl" className="btn">Submit to Airl</button>
        </form>
        {fireRedirect && (
          <Redirect to={from || '/confirmation'}/>
        )}
      </div>
    );

  }

}

var MainForm = require('./mainForm');
var Summary = require('./Summary');
var Confirmation = require('./Confirmation');

//put component into html page
ReactDOM.render(<App />,document.getElementById('calc-wrapper'));
