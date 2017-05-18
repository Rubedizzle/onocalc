var React = require('react');
var ReactDOM = require('react-dom');

import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';

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
      <div id="calculator">
        <h1>Calculator</h1>
        <MainForm success={this.onSuccess} />
        <Link to={'/success'}><button className="pure-button pure-button-primary">CALCULATE</button></Link>
      </div>
    );

  }

}


class Entry extends React.Component{

  render(){
    return (
      <div id="welcome">
        <h2>Airl Financial Savings Calculator</h2>
        <h4 className="bubbles">Notice details go here</h4>
        <Link to={'/calc'}><button className="pure-button pure-button-primary">Let us start</button></Link>
      </div>
    );

  }

}

class Success extends React.Component{
  render(){
    console.log('success');
    return (
      <div id="success-page">
        <h1>This is how Airl Financial can help!</h1>
        <Summary />
      </div>
    );

  }

}

var MainForm = require('./mainForm');
var Summary = require('./Summary');

//put component into html page
ReactDOM.render(<App />,document.getElementById('calc-wrapper'));
