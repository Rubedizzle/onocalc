import React from 'react';

import debtStore from './stores/DebtStore'
import {observer} from 'mobx-react';
import userStore from './stores/User'

@observer (['UserStore'])
@observer (['DebtStore'])
class Confirmation extends React.Component{

  render(){
    return (
      <div className="confirmation">
        <span id="confirmationNum">AF1902902340435</span>
        <h1>Thanks _____! We have sent a confirmation email to test@test.com.</h1>
        <h3>One of our representatives will be in contact with you shortly.</h3>
      </div>
    );
  }

};

module.exports = Confirmation;
