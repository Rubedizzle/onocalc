import React from 'react';
import {observer} from 'mobx-react';
import AddDebt from './AddDebt';

var DebtList = require('./debtList');
var Summary = require('./summary');

import userStore from './stores/User'

@observer (['UserStore'])
class MainForm extends React.Component{

  render(){
    return (
      <div className="mainForm">
        <form id="cx-details" className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
          <fieldset>
          <div className="logo"><img src="../images/logo.jpg" /></div>
            <div id="personalInfo">
            <div className="pure-control-group">
              <h2>Contact Information</h2>
              <input type="text" name="first_name" label="First Name" ref="firstName" placeholder="First Name" onChange={this.setUserDetails}/>
              <input type="text" name="last_name" label="Last Name" ref="lastName" placeholder="Last Name" onChange={this.setUserDetails}/>
              <input type="email" name="email" label="Email Address" ref="emailAddress" placeholder="Email" onChange={this.setUserDetails}/>
              <input type="text" name="phone" label="Phone Number" ref="phoneNumber" placeholder="Phone Number" onChange={this.setUserDetails}/>
            </div>
            <div className="pure-control-group">
              <input type="text" name="address" label="Street Address" ref="streetAddress" placeholder="Street Address" onChange={this.setUserDetails}/>
              <input type="text" name="city" label="City" ref="cityName" placeholder="City" onChange={this.setUserDetails}/>
              <input type="text" name="province" label="Province" ref="province" placeholder="Province" onChange={this.setUserDetails}/>
              <input type="text" name="postal_code" label="Postal Code" ref="postalCode" placeholder="Postal Code" onChange={this.setUserDetails}/>
            </div>
            </div>
          </fieldset>
          <div id="cmi" className="pure-control-group pure-u-1-2">
            <fieldset>
              <h2>Current Mortgage Information</h2>
              <input type="text" name="home_value" label="Market Value of Home" ref="homeValue" placeholder="Fair Market Value of Home" onChange={this.updateHomeDetails}/><br />
              <input type="text" name="mortgage" label="Total Mortgage" ref="totalMortgage" placeholder="Total Mortgage Amount" onChange={this.updateHomeDetails}/><br />
              <input type="text" name="interest_rate" label="Mortgage Interest Rate" ref="interestRate" placeholder="Mortgage Interest Rate (%)" onChange={this.updateHomeDetails}/><br />
              <input type="text" name="term_years" label="Mortgage Term" ref="termYears" placeholder="Mortgage Term (years)" onChange={this.updateHomeDetails}/><br />
              <input type="text" name="amortization" label="Amortization Period" ref="amortizationPeriod" placeholder="Amortization Period (years)" onChange={this.updateHomeDetails}/>
            </fieldset>
          </div>
          <AddDebt />
          <DebtList updateDebts={this.updateDebts}/>
          <br/>
          <br/>
        </form>
      </div>
    );
  }

  updateHomeDetails(e){
    var field = '';
    // if (e.target.name == 'home_value') {
    //   field = 'homeValue';
    // }
    // else if (e.target.name == "mortgage"){
    //   field = 'totalMortgage';
    // }
    // else if (e.target.name == "interest_rate") {
    //   field = 'interestRate';
    // }
    // else if (e.target.name == "term_years") {
    //   field = 'termYears';
    // }
    // else if (e.target.name == "amortization") {
    //   field = 'amortizationPeriod';
    // }
    // userStore.setField(field,e.target.value);
    if (e.target.name == 'home_value') {
      userStore.homeValue = e.target.value;
    }
    else if (e.target.name == "mortgage"){
      userStore.totalMortgage = e.target.value;
    }
    else if (e.target.name == "interest_rate") {
      userStore.interestRate = e.target.value;
    }
    else if (e.target.name == "term_years") {
      userStore.termYears = e.target.value;
    }
    else if (e.target.name == "amortization") {
      userStore.amortizationPeriod = e.target.value;
    }
  }

  setUserDetails(e){
    userStore.setField(e.target.name,e.target.value);
  }

  handleSubmit(e){
    e.preventDefault();
    this.userStore.setField({
      firstName:this.refs.firstName.value,
      lastName:this.refs.lastName.value,
      emailAddress:this.refs.emailAddress.value,
      phoneNumber:this.refs.phoneNumber.value,
      streetAddress:this.refs.streetAddress.value,
      cityName:this.refs.cityName.value,
      province:this.refs.province.value,
      postalCode:this.refs.postalCode.value,
      homeValue:this.refs.homeValue.value,
      totalMortgage:this.refs.totalMortgage.value,
      interestRate:this.refs.interestRate.value,
      termYears:this.refs.termYears.value,
      amortizationPeriod:this.refs.amortizationPeriod.value
    })
  }

  updateDebts(newDebts){
    console.log('newDebts invoked');
    console.log(newDebts)
    this.setState({
      debts: newDebts
    })
  }

};

module.exports = MainForm;
