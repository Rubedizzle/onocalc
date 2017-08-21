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
    return +(Math.round(userStore.mortgagePayment() + "e+2")  + "e-2");

    var P = userStore.totalMortgage;
    var I = userStore.interestRate / 100 / 12;
    var N = userStore.amortizationPeriod * 12;
    console.log('calculating');
    console.log('total mortgage: ' + P);
    console.log('interest rate over 12: ' + I);
    console.log('amortization period in months: ' + N);
    var payment = Math.round((P * I * (Math.pow(1 + I, N)) / (Math.pow(1 + I, N) - 1)) * 100) / 100;
    return payment;
  }

  calculateCurrentMonthlyDebtPayment(){
    return +(Math.round(debtStore.debtMonthlyPayment() + "e+2")  + "e-2");
  }

  calculateCurrentMonthlyObligation(){
    return userStore.mortgagePayment() + debtStore.debtMonthlyPayment();
  }

  calculateAirlPayment(){
    var P = +userStore.totalMortgage + +userStore.airlFee + debtStore.total();
    var I = userStore.airlRate / 100 / 12;
    var N = userStore.airlAmortizationPeriod * 12;
    console.log('P: ' + P);
    console.log(I);
    console.log(N);
    var payment = Math.round((P * I * (Math.pow(1 + I, N)) / (Math.pow(1 + I, N) - 1)) * 100) / 100;
    console.log(payment);
    return +(Math.round(payment + "e+2")  + "e-2");
  }

  calculateSavings(){
    return +(Math.round(this.calculateCurrentMonthlyMortgagePayment()
                      + this.calculateCurrentMonthlyDebtPayment()
                      - this.calculateAirlPayment() + "e+2")  + "e-2");
  }

  calculate50CashFlowSavings(){
    return this.calculateSavings() * 0.5;
  }

  calculateMonthsToPayOffAccelerated(){
    var P = +userStore.totalMortgage + +userStore.airlFee + debtStore.total();
    var I = userStore.airlRate / 100 / 12;
    return -(Math.log( 1 - (I * P) / (this.calculateAirlPayment() + (this.calculateSavings() * 0.5)) )) / +(Math.log( 1 + I ));
  }

  render(){
    console.log(debtStore.list);
    return (
      <div className="results">
        <h1>Airl Financial can save up to <span className="save">${this.calculateSavings()}</span> / month</h1>
        <h3>Your current monthly obligations are ${this.calculateCurrentMonthlyObligation()}</h3>
        <h2>New Consolidated Monthly Payment: ${this.calculateAirlPayment()} / month</h2>
        <h2>Add 50% of the cash flow savings to your monthly payments, and you could be debt free in {Math.round(this.calculateMonthsToPayOffAccelerated())} monthes!</h2>
        <h2>Total Mortgage: {userStore.totalMortgage}</h2>
        <h2>Total Debts: {debtStore.total()}</h2>
      </div>
    );
  }

};

module.exports = Summary;
