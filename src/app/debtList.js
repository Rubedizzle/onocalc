import React from 'react';
import DebtItem from './debtItem';

import debtStore from './stores/DebtStore'
import {observer} from 'mobx-react';

@observer (['DebtStore'])
class DebtList extends React.Component{

  onDelete(item){
    debtStore.del(item);
    // this.setState({
    //   debts: updatedDebts
    // });

  }

  // getInitialState:function(){
  //   return {
  //     debts: [
  //
  //       // {
  //       //     name: 'credit card',
  //       //     total_debt: 3500,
  //       //     debt_interest_rate: 0.20,
  //       //     monthly_payment: 800
  //       // },
  //       // {
  //       //     name: 'student loan',
  //       //     total_debt: 10000,
  //       //     debt_interest_rate: 0.05,
  //       //     monthly_payment: 200
  //       // },
  //       // {
  //       //     name: 'line of credit',
  //       //     total_debt: 2700,
  //       //     debt_interest_rate: 0.10,
  //       //     monthly_payment: 100
  //       // }
  //     ]
  //   }
  //
  // },

  onAdd(item){
    var updatedDebts = this.state.debts;
    updatedDebts.push(item);
    this.setState({
      debts:updatedDebts
    })
    this.props.updateDebts(updatedDebts)
  }

  render(){
    var debts = debtStore.all;
      debts = debts.map(function(item, index){
        return (
            <DebtItem debt={item} key={index} onDelete={this.onDelete}/>
        );
      }.bind(this))
    return (
      <div className="debtlist">
        <h2>Debts</h2>
        <div className = "pure-g">
          {debts.length == 0 &&
              <div className="pure-u-1-3">
                No debts added - please add a debt below!
              </div>
          }
              {debts}
        </div>
        <hr/>
      </div>
      );

  }

};

module.exports = DebtList;
