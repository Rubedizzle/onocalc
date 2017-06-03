import React from 'react';

import debtStore from './stores/DebtStore'
import {observer} from 'mobx-react';
import userStore from './stores/User'

@observer (['UserStore'])
@observer (['DebtStore'])
class Confirmation extends React.Component{

  render(){
    return (
      <div className="container">
        <div className="innContainer centerText">
          <div className="pure-g">
            <div className="pure-u-1">
                  <div className="logo"><img src="../images/logo.jpg" /></div>
      <div className="confirmation">
        <h3>Your Confirmation Number:</h3> <span id="confirmationNum" className="ticket">AF1902902340435</span>
        <h2>Thanks <strong>_____</strong>! We have sent a confirmation email to info@airlfinancial.com</h2>
        <h3>One of our representatives will be in contact with you shortly.</h3>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }

};

module.exports = Confirmation;
