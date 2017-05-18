import React from 'react';

class DebtItem extends React.Component{

  render(){
    return (
        <div className="debt-item pure-u-1-3">
          <span className="debt-type">{this.props.debt.debtType}</span>
          <p>Total Debt: ${this.props.debt.totalDebt}</p>
          <p>Interest Rate: {this.props.debt.interestRate}%</p>
          <p>Monthly Payment: ${this.props.debt.monthlyPayment}</p>
          <button className="button-small pure-button" onClick={this.handleDelete}>Delete Debt</button>
        </div>
    );

  }

  handleDelete = () => {
    this.props.onDelete(this.props.debt);
  }

};

module.exports = DebtItem;
