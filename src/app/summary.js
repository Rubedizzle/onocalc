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

    var P = 230000;
    var I = 3 / 100 / 12;
    var N = 25 * 12;
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

  calculateAirlPayment(){
    var P = 230000 + 20000 + debtStore.total();
    var I = 2.5 / 100 / 12;
    var N = 30 * 12;
    console.log(P);
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

  render(){
    console.log(debtStore.list);
    return (
      <div className="results">
        <h1>Airl Financial will save you <span className="save">${this.calculateSavings()}</span> / month</h1>
        <h3>Current Mortgage Payment: ${userStore.mortgagePayment()} / month</h3>
        <div id="debtSummary">
          <h3>Current Total Debt Payment: ${debtStore.debtMonthlyPayment()} / month</h3>
          <div id="debtList">
            {debtStore.list()}
          </div>
        </div>
        <h2>New Consolidated Monthly Payment: ${this.calculateAirlPayment()} / month</h2>
      </div>
    );
  }

};

module.exports = Summary;
