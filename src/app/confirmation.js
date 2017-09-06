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
        <h3>Your Confirmation Number:</h3> <span id="confirmationNum" className="ticket">{ userStore.getConfID() }</span>
        <h2>Thanks <strong>{userStore.getField('first_name')}</strong>! We have sent a confirmation email to {userStore.getField('email')}</h2>
        <h3>One of our representatives will be in contact with you shortly.</h3>
        <a href="http://airlfinancial.com">
          <button type="button" className="btn btn-primary"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Back to Airl Financial</button>
        </a>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }

};

module.exports = Confirmation;
