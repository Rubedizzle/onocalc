import React from 'react';
import { autorun, observable, action } from 'mobx';

class DebtStore {
  @observable all = [];

  @action add(debt, total, interest, monthly ) {
    console.log('attemping to add');
    var newDebt = {
      debtType: debt,
      totalDebt: total,
      interestRate:interest,
      monthlyPayment:monthly
    };
    debtStore.all.push(newDebt);
    console.log('added');
  }

  @action del(item) {
    console.log('attempting to delete');
    var updatedDebts = debtStore.all.filter(function(val,index){
      return item !== val;
    });
    debtStore.all = updatedDebts;
    console.log('done');
  }

  @observable list(){
    var debts = debtStore.all;
    debts = debts.map(function(item, index){
      return (
          <div className="debt-summary-item">
            <span className="debt-type">{item.debtType}</span>
            <p>Total Debt: ${item.totalDebt}</p>
            <p>Interest Rate: {item.interestRate}%</p>
            <p>Monthly Payment: ${item.monthlyPayment}</p>
          </div>
      )
    });
    return (
      <div id="listofDebts">
        {debts}
        <div className="clear"></div>
      </div>

  );
  }

  @observable total(){
    var debts = debtStore.all;
    var sumOfDebts = parseFloat(0);
    for (var i = 0; i < debts.length; i++) {
      sumOfDebts = parseFloat(sumOfDebts) + parseFloat(debts[i].totalDebt);
    }
    return sumOfDebts;
  }

  @observable debtMonthlyPayment(){
    var debts = debtStore.all;
    var debtPayment = parseFloat(0);
    for (var i = 0; i < debts.length; i++) {
      debtPayment = parseFloat(debtPayment) + parseFloat(debts[i].monthlyPayment);
    }
    return debtPayment;
  }
}

var debtStore = window.debtStore = new DebtStore
export default debtStore;

autorun(() => {
  console.log(debtStore.all);
})
