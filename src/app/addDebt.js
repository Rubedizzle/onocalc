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
      <div className="addADebt pure-u-1-2">
      <form id="newDebtForm" className="pure-form" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset className="pure-group">
          <h2>Add a Debt</h2>
          <select name="debtTypes" className="pure-input-1-2" ref="newDebt" onChange={this.handleChange.bind(this)}>
            <option value="Credit Card">Credit Card</option>
            <option value="Car Loan">Car Loan</option>
            <option value="Line of Credit">Line of Credit</option>
            <option value="Student Loan">Student Loan</option>
          </select><br /><br />
          <input type="text" placeholder="Total Debt Amount" name="total_debt" label="Total Debt Amount" ref="totalDebt"/><br />
          <input type="text" placeholder="Interest Rate" name="debt_interest_rate" label="Interest Rate" ref="interestRate"/><br />
          <input type="text" placeholder="Monthly Payment" name="monthly_payment" label="Monthly Payment" ref="monthlyPayment"/><br />
          <input type="submit" className="btn" value="Add Debt"/>
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
