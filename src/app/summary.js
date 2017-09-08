import React from 'react';

import debtStore from './stores/DebtStore'
import {observer} from 'mobx-react';
import userStore from './stores/User'

@observer (['UserStore'])
@observer (['DebtStore'])
class Summary extends React.Component{

  calculateCurrentMonthlyMortgagePayment(){
    //var P = this.props.summary.totalMortgage;
    //var I = this.props.summary.interestRate / 100 / 12;
    //var N = this.props.summary.amortizationPeriod * 12;
    return +Math.round(userStore.mortgagePayment()).toFixed(2);

    var P = userStore.totalMortgage;
    var I = userStore.interestRate / 100 / 12;
    var N = userStore.amortizationPeriod * 12;
    //console.log('calculating');
    //console.log('total mortgage: ' + P);
    //console.log('interest rate over 12: ' + I);
    //console.log('amortization period in months: ' + N);
    var payment = Math.round((P * I * (Math.pow(1 + I, N)) / (Math.pow(1 + I, N) - 1)) * 100) / 100;
    return payment;
  }

  calculateCurrentMonthlyDebtPayment(){
    return +Math.round(debtStore.debtMonthlyPayment()).toFixed(2);
  }

  calculateCurrentMonthlyObligation(){
    return +(userStore.mortgagePayment() + debtStore.debtMonthlyPayment()).toFixed(2);
  }

  calculateAirlPayment(){
    var P = +userStore.totalMortgage + +userStore.airlFee + debtStore.total();
    var I = userStore.airlRate / 100 / 12;
    var N = userStore.airlAmortizationPeriod * 12;
    //console.log('P: ' + P);
    //console.log(I);
    //console.log(N);
    var payment = Math.round((P * I * (Math.pow(1 + I, N)) / (Math.pow(1 + I, N) - 1)) * 100) / 100;
    //console.log(payment);
    userStore.setField('airlPayment',payment);
    return +Math.round(payment).toFixed(2);
  }

  calculateSavings(){
    return +Math.round(this.calculateCurrentMonthlyMortgagePayment()
                      + this.calculateCurrentMonthlyDebtPayment()
                      - this.calculateAirlPayment()).toFixed(2);
  }

  calculate50CashFlowSavings(){
    return +(this.calculateSavings() * 0.5).toFixed(2);
  }

  calculateMonthsToPayOffAccelerated(){
    var P = +userStore.totalMortgage + +userStore.airlFee + debtStore.total();
    var I = userStore.airlRate / 100 / 12;
    return -(Math.log( 1 - (I * P) / (this.calculateAirlPayment() + (this.calculateSavings() * 0.5)) )) / +(Math.log( 1 + I ));
  }

  calculateLTV(){
    return +(((+userStore.totalMortgage + +debtStore.total() + +userStore.airlFee) / +userStore.homeValue)* 100).toFixed(2);
  }

  render(){
    //console.log(debtStore.list);
    return (
      <div className="results">
          {this.calculateSavings() >= 0 &&
            <h1>Airl Financial can save up to <span className="save">${this.calculateSavings()}</span> / month</h1>
          }
          <h3>Your current monthly obligations are ${this.calculateCurrentMonthlyObligation()}</h3>
          <h3>Total Mortgage: ${userStore.totalMortgage}</h3>
          <h3>Total Debts: ${debtStore.total()}</h3>
          <h2>New Consolidated Monthly Payment: <span className="save">${this.calculateAirlPayment()}</span> / month</h2>
          <h3>Add 50% of the cash flow savings to your monthly payments, and you could be debt free in {Math.round(this.calculateMonthsToPayOffAccelerated())} months!</h3>
          {this.calculateLTV() >= 80 &&
            <h4>Please Note: The LTV is greater than 80%, and therefore the remaining balance is calculated at 10% interest only.</h4>
          }
      </div>
    );
  }

};

module.exports = Summary;
