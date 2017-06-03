var React = require('react');
var ReactDOM = require('react-dom');

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
  onSuccess(){
    history.push('./success')
  }

  render(){
    console.log('test');
    return (
      <div className="container">
        <div className="innContainer centerText">
            <div className="pure-g">
            <div id="calculator">
              <MainForm success={this.onSuccess} />
              <Link to={'/success'}><button className="btn">CALCULATE</button></Link>
            </div>
          </div>
        </div>
      </div>
    );

  }

}


class Entry extends React.Component{

  render(){
    return (
<div className="container">
  <div className="innContainer centerText">
    <div className="pure-g">
      <div className="pure-u-1">
            <div className="logo"><img src="../images/logo.jpg" /></div>
            <h2>Airl Financial Savings Calculator</h2>
            <p>Let us help you create an instant summary of the estimated savings between paying off your consumer debts under the existing amortization schedule in comparison to accelerating the repayment of your debts using our program.</p>
            <Link to={'/calc'}><button className="btn"><i className="fa fa-calculator" aria-hidden="true"></i> Get Started!</button></Link>
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

  handleSubmit(e){
    e.preventDefault();
    this.setState({ fireRedirect: true })
  }

  toggle(event) {
  this.setState({
    checkboxState: !this.state.checkboxState
  });
  console.log (!this.state.checkboxState + ' switched to ' + this.state.checkboxState);
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
