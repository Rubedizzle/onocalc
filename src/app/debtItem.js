import React from 'react';

class DebtItem extends React.Component{
  constructor (){
    super();
    this.icons = {
      creditCard: 'fa-credit-card',
      car: 'fa-car',
      creditLine: 'fa-university',
      loan: 'fa-graduation-cap',
      other: 'fa-usd'
    };
  }

  render(){
    var debtType = this.props.debt.debtType;
    var debtIcon = 'fa-bar-chart';

    if (debtType === 'Credit Card'){
      debtIcon = this.icons.creditCard;
    } else if (debtType === 'Car Loan'){
      debtIcon = this.icons.car;
    } else if (debtType === 'Line of Credit'){
      debtIcon = this.icons.creditLine;
    } else if (debtType === 'Student Loan'){
      debtIcon = this.icons.loan;
    } else if (debtType === 'Other'){
      debtIcon = this.icons.other;
    }

    return (
        <div className="debt-item pure-u-1-4">
          <i className={'fa ' + debtIcon + ' debtIcon'} aria-hidden="true"></i>
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
