import React from 'react';
import debtStore from './stores/DebtStore'
import {observer} from 'mobx-react';

@observer (['DebtStore'])
class AddDebt extends React.Component{

  constructor(){
    super();
    this.debtType= "Credit Card";
  }

  render(){
    return(
      <div className="addADebt">
      <form id="newDebtForm" className="pure-form" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset className="pure-group">
          <h3>Add a Debt</h3>
          <select name="debtTypes" className="pure-input-1-2" ref="newDebt" onChange={this.handleChange.bind(this)}>
            <option value="Credit Card">Credit Card</option>
            <option value="Car Loan">Car Loan</option>
            <option value="Line of Credit">Line of Credit</option>
            <option value="Student Loan">Student Loan</option>
          </select>
          <p>Total Debt Amount</p>
          <input type="text" name="total_debt" label="Total Debt Amount" ref="totalDebt"/>
          <p>Interest Rate</p>
          <input type="text" name="debt_interest_rate" label="Interest Rate" ref="interestRate"/>
          <p>Monthly Payment</p>
          <input type="text" name="monthly_payment" label="Monthly Payment" ref="monthlyPayment"/>
          <input type="submit" value="Add Debt"/>
        </fieldset>
      </form>
      </div>
    )

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

  handleSubmit(e){
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
  }

};

module.exports = AddDebt;
