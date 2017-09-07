import React from 'react';
import {observer} from 'mobx-react';
import AddDebt from './AddDebt';
import FormErrors from './FormErrors';

var DebtList = require('./debtList');
var Summary = require('./summary');

import userStore from './stores/User'

import {BrowserRouter as Router, Route, Switch, Link, withRouter, Redirect} from 'react-router-dom';

@observer (['UserStore'])
class MainForm extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      fireRedirect: false,
      first_name:'',
      last_name:'',
      email: '',
      phone:'',
      address:'',
      city:'',
      province:'',
      postal_code:'',
      income:'',
      home_value:'',
      mortgage:'',
      interest_rate:'',
      term_years:'',
      amortization:'',
      formErrors: { first_name:'',
                    last_name:'',
                    email: '',
                    phone:'',
                    address:'',
                    city:'',
                    province:'',
                    postal_code:'',
                    income:'',
                    home_value:'',
                    mortgage:'',
                    interest_rate:'',
                    term_years:'',
                    amortization:''},
      first_nameValid: false,
      last_nameValid: false,
      emailValid: false,
      phoneValid: false,
      addressValid: false,
      cityValid: false,
      provinceValid: false,
      postal_codeValid: false,
      incomeValid: false,
      home_valueValid: false,
      mortgageValid: false,
      interest_rateValid: false,
      term_yearsValid: false,
      amortizationValid: false,
      formValid: false
    }
  }

  render(){
    const { from } = '/'
    const { fireRedirect } = this.state

    return (
      <div className="mainForm">
        <form id="cx-details" className="pure-form pure-form-aligned" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
          <div className="logo"><img src="../images/logo.jpg" /></div>
            <div id="personalInfo">
            <div className="pure-control-group">
              <h2>Contact Information<br/>
              <span className="req_optional">(required)</span></h2>
              <input type="text" name="first_name" label="First Name" ref="firstName" placeholder="First Name" value={this.state.first_name} onChange={(event) => this.setUserDetails(event)} required/>
              <input type="text" name="last_name" label="Last Name" ref="lastName" placeholder="Last Name" value={this.state.last_name} onChange={(event) => this.setUserDetails(event)} required/>
              <input type="email" name="email" label="Email Address" ref="emailAddress" placeholder="Email" value={this.state.email} onChange={(event) => this.setUserDetails(event)} className={this.errorClass(this.state.formErrors.email)} required/>
              <input type='tel' name="phone" label="Phone Number" ref="phoneNumber" placeholder="Phone Number" value={this.state.phone} onChange={(event) => this.setUserDetails(event)} required/>
            </div>
            <div className="pure-control-group">
              <input type="text" name="address" label="Street Address" ref="streetAddress" placeholder="Street Address" value={this.state.address} onChange={(event) => this.setUserDetails(event)} required/>
              <input type="text" name="city" label="City" ref="cityName" placeholder="City" value={this.state.city} onChange={(event) => this.setUserDetails(event)} required/>
              <input type="text" name="province" label="Province" ref="province" placeholder="Province" value={this.state.province} onChange={(event) => this.setUserDetails(event)} required/>
              <input type="text" name="postal_code" label="Postal Code" ref="postalCode" placeholder="Postal Code" value={this.state.postal_code} onChange={(event) => this.setUserDetails(event)} required/>
            </div>
            <div className="pure-control-group">
              <input type="number" step="1" min="0" name="income" label="Gross Household Annual Income" ref="householdIncome" placeholder="Gross Household Annual Income ($)" value={this.state.income} onChange={(event) => this.setUserDetails(event)} className={`incomeInput ${this.errorClass(this.state.formErrors.income)}`} required/>
            </div>
            </div>
          </fieldset>
          <div id="cmi" className="pure-control-group pure-u-1-2">
            <fieldset>
              <h2>Current Mortgage Information<br/>
              <span className="req_optional">(required)</span></h2>
              <input type="number" name="home_value" step="1" min="0" label="Market Value of Home" ref="homeValue" placeholder="Fair Market Value of Home ($)" onChange={(event) => this.updateHomeDetails(event)} className={this.errorClass(this.state.formErrors.home_value)} required/><br />
              <input type="number" step="1" min="0" name="mortgage" label="Total Mortgage" ref="totalMortgage" placeholder="Total Mortgage Amount ($)" onChange={(event) => this.updateHomeDetails(event)} className={this.errorClass(this.state.formErrors.mortgage)} required/><br />
              <input type="number" step="0.01" min="0" max="30" name="interest_rate" label="Mortgage Interest Rate" ref="interestRate" placeholder="Mortgage Interest Rate (%)" onChange={(event) => this.updateHomeDetails(event)} className={this.errorClass(this.state.formErrors.interest_rate)} required/><br />
              <input type="number" name="term_years" step="1" min="0" max="10" label="Mortgage Term" ref="termYears" placeholder="Mortgage Term (years)" onChange={(event) => this.updateHomeDetails(event)} className={this.errorClass(this.state.formErrors.term_years)} required/><br />
              <input type="number" name="amortization" step="5" min="0" max="30" label="Amortization Period" ref="amortizationPeriod" placeholder="Amortization Period (years)" onChange={(event) => this.updateHomeDetails(event)} className={this.errorClass(this.state.formErrors.amortization)} required/>
            </fieldset>
          </div>
          <AddDebt />
          <DebtList updateDebts={this.updateDebts}/>
          <br/>
          <br/>
          <div className="panel panel-default">
           <span className="formInstructions">{this.state.formValid ? '' : 'Please fill in all the required fields above, and check what you may have missed.'}</span>
           <FormErrors formErrors={this.state.formErrors} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Calculate Savings</button>
          {fireRedirect && (
            <Redirect to={from || '/success'}/>
          )}
        </form>
      </div>
    );
  }

  errorClass(error) {
     return(error.length === 0 ? '' : 'has-error');
  }

  updateHomeDetails(e){
    var field = '';
    const name = e.target.name;
    const value = e.target.value;
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
      if (name == 'home_value') {
        userStore.homeValue = value;
      }
      else if (name == "mortgage"){
        userStore.totalMortgage = value;
      }
      else if (name == "interest_rate") {
        userStore.interestRate = value;
      }
      else if (name == "term_years") {
        userStore.termYears = value;
      }
      else if (name == "amortization") {
        userStore.amortizationPeriod = value;
      }
  this.setState({[name]: value},
                      () => { this.validateField(name, value) });
  }

  setUserDetails(e){
    console.log(e.target.name);
    const name = e.target.name;
    const value = e.target.value;
    userStore.setField(name,value);
    this.setState({[name]: value},
                    () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let incomeValid = this.state.incomeValid;
    let home_valueValid = this.state.home_valueValid;
    let mortgageValid = this.state.mortgageValid;
    let interest_rateValid = this.state.interest_rateValid;
    let term_yearsValid = this.state.term_yearsValid;
    let amortizationValid = this.state.amortizationValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Email address is invalid';
        console.log(fieldValidationErrors.email);
        break;
      case 'income':
        incomeValid = value.match(/^((\d+(\.\d*)?)|(\.\d+))$/) && value > 0;
        fieldValidationErrors.income = incomeValid ? '' : 'Gross Household Annual Income is invalid';
        console.log(fieldValidationErrors.income);
        break;
      case 'home_value':
        home_valueValid = value.match(/^((\d+(\.\d*)?)|(\.\d+))$/) && value > 0;
        fieldValidationErrors.home_value = home_valueValid ? '' : 'Market value of Home is invalid';
        console.log(fieldValidationErrors.home_value);
        break;
      case 'mortgage':
        mortgageValid = value.match(/^((\d+(\.\d*)?)|(\.\d+))$/) && +value <= +this.state.home_value;
        console.log('home value: ' + this.state.home_value);
        console.log('mortgage value: ' + value);
        fieldValidationErrors.mortgage = mortgageValid ? '' : 'Mortgage value should be less than the Fair Market Value of the Home';
        console.log(fieldValidationErrors.mortgage);
        break;
      case 'interest_rate':
        interest_rateValid = value.match(/^((\d+(\.\d*)?)|(\.\d+))$/) && value > 0 && value <= 10;
        fieldValidationErrors.interest_rate = interest_rateValid ? '' : 'Interest Rate should be between 0 and 10';
        console.log(fieldValidationErrors.interest_rate);
        break;
      case 'term_years':
        term_yearsValid = value.match(/^\d*$/) && value > 0 && value <= 10;
        fieldValidationErrors.term_years = term_yearsValid ? '' : 'Mortgage Term should be between 0 and 10';
        console.log(fieldValidationErrors.term_years);
        break;
      case 'amortization':
        amortizationValid = value.match(/^\d*$/) && value >= 5 && value <= 30;;
        fieldValidationErrors.amortization = amortizationValid ? '' : 'Amortization Period should be between 5 and 30';
        console.log(fieldValidationErrors.amortization);
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    incomeValid: incomeValid,
                    home_valueValid: home_valueValid,
                    mortgageValid: mortgageValid,
                    interest_rateValid: interest_rateValid,
                    term_yearsValid: term_yearsValid,
                    amortizationValid: amortizationValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid &&
                              this.state.incomeValid &&
                              this.state.home_valueValid &&
                              this.state.mortgageValid &&
                              this.state.interest_rateValid &&
                              this.state.term_yearsValid &&
                              this.state.amortizationValid &&
                              this.contactValid()});
  }

  contactValid(){
    return (this.fieldFilled(this.stripChar(userStore.getField('first_name'))) &&
          this.fieldFilled(this.stripChar(userStore.getField('last_name'))) &&
          this.fieldFilled(this.stripChar(userStore.getField('email'))) &&
          this.fieldFilled(this.stripChar(userStore.getField('phone'))) &&
          this.fieldFilled(this.stripChar(userStore.getField('address'))) &&
          this.fieldFilled(this.stripChar(userStore.getField('city'))) &&
          this.fieldFilled(this.stripChar(userStore.getField('province'))) &&
          this.fieldFilled(this.stripChar(userStore.getField('postal_code'))) )
  }

  stripChar(value){
    return (value.replace(/\s/g,''))
  }

  fieldFilled(field){
    return (field.length > 0 ? true : false)
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('form valid:' + this.state.formValid);
    console.log('form errors:' + this.state.formErrors);
      if (this.state.formValid == true ){
        this.setState({ fireRedirect: true });
      }
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
