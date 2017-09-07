import React from 'react';
import debtStore from './stores/DebtStore'
import {observer} from 'mobx-react';
import FormErrors from './FormErrors';

@observer (['DebtStore'])
class AddDebt extends React.Component{

  constructor(){
    super();
    this.debtType="Credit Card";
    this.state = {
    total_debt:'',
    debt_interest_rate:'',
    monthly_payment: '',
    formErrors: { total_debt:'',
                  debt_interest_rate:'',
                  monthly_payment: ''},
    total_debtValid: false,
    debt_interest_rateValid: false,
    monthly_paymentValid: false,
    formValid: false}
  }

  render(){
    return(
      <div className="addADebt pure-u-1-2">
      <form id="newDebtForm" className="pure-form">
        <fieldset className="pure-group">
          <h2>Add a Debt<br/>
          <span className="req_optional">(optional)</span></h2>
          <select name="debtTypes" className="pure-input-1-2" ref="newDebt" onChange={this.handleChange.bind(this)}>
            <option value="Credit Card">Credit Card</option>
            <option value="Car Loan">Car Loan</option>
            <option value="Line of Credit">Line of Credit</option>
            <option value="Student Loan">Student Loan</option>
            <option value="Other">Other</option>
          </select><br /><br />
          <input type="number" step="1" min="0" placeholder="Total Debt Amount ($)" name="total_debt" label="Total Debt Amount" ref="totalDebt" onChange={(event) => this.updateDebtDetails(event)}  className={this.errorClass(this.state.formErrors.total_debt)}/><br />
          <input type="number" step="0.01" min="0" placeholder="Interest Rate (%)" name="debt_interest_rate" label="Interest Rate" ref="interestRate" onChange={(event) => this.updateDebtDetails(event)} className={this.errorClass(this.state.formErrors.debt_interest_rate)}/><br />
          <input type="number" step="1" min="0" placeholder="Monthly Payment ($)" name="monthly_payment" label="Monthly Payment" ref="monthlyPayment" onChange={(event) => this.updateDebtDetails(event)} className={this.errorClass(this.state.formErrors.monthly_payment)}/><br />
          <FormErrors formErrors={this.state.formErrors} />
          <button type="button" className="btn" value="Add Debt" disabled={!this.state.formValid} onClick={this.handleDebtSubmit.bind(this)}>Add Debt</button>
        </fieldset>
      </form>
      </div>
    )

  }

  errorClass(error) {
     return(error.length === 0 ? '' : 'has-error');
  }

updateDebtDetails(e){
  const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]: value},
                () => { this.validateField(name, value) });
}

validateField(fieldName, value) {
  let fieldValidationErrors = this.state.formErrors;
  let total_debtValid = this.state.total_debtValid;
  let debt_interest_rateValid = this.state.debt_interest_rateValid;
  let monthly_paymentValid = this.state.monthly_paymentValid;

  switch(fieldName) {
    case 'total_debt':
      total_debtValid = value.match(/^((\d+(\.\d*)?)|(\.\d+))$/);
      fieldValidationErrors.total_debt = total_debtValid ? '' : 'Total Debt Amount is invalid';
      break;
    case 'debt_interest_rate':
      debt_interest_rateValid = value.match(/^((\d+(\.\d*)?)|(\.\d+))$/) && value >= 0 && value <= 30;
      console.log(debt_interest_rateValid);
      fieldValidationErrors.debt_interest_rate = debt_interest_rateValid ? '' : 'Debt Interest Rate must be between 0 and 30';
      break;
    case 'monthly_payment':
      monthly_paymentValid = value.match(/^((\d+(\.\d*)?)|(\.\d+))$/) && +value < +this.state.total_debt;
      fieldValidationErrors.monthly_payment = monthly_paymentValid ? '' : 'Monthly Payment must be less than the Total Debt';
      break;
    default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  total_debtValid: total_debtValid,
                  debt_interest_rateValid: debt_interest_rateValid,
                  monthly_paymentValid: monthly_paymentValid
                }, this.validateForm);
}

validateForm() {
  this.setState({formValid: this.state.total_debtValid
                            && this.state.debt_interest_rateValid
                            && this.state.monthly_paymentValid});
}

  handleChange(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.debtType= value.pop();
}

  handleDebtSubmit(e){
    e.preventDefault();
    debtStore.add(
      this.debtType,
      this.refs.totalDebt.value,
      this.refs.interestRate.value,
      this.refs.monthlyPayment.value
    );
    this.refs.totalDebt.value = '';
    this.refs.interestRate.value = '';
    this.refs.monthlyPayment.value = '';
    this.setState({total_debtValid: false,
    debt_interest_rateValid: false,
    monthly_paymentValid: false,
    formValid: false,
    total_debt: '',
    debt_interest_rate: '',
    monthly_payment: ''});
  }

};

module.exports = AddDebt;
