import React from 'react';
import { observable, autorun, action, computed, reaction, when, runInAction } from 'mobx';

class UserStore {
  @observable all = {
    homeValue : 0,
    totalMortgage : 0,
    interestRate : 0,
    termYears : 0,
    amortizationPeriod : 0,
    confirmation : '',
    airlPayment : 0,
    income: +0,
    credit_level: '',
    credit_score: '',
    comments: ''
  };

  @observable.ref errors = {};

  @observable pending = false;
  @observable submitted = false;

  @observable totalMortgage = +250000;
  @observable homeValue = +300000;
  @observable interestRate = +5;
  @observable termYears = +5;
  @observable amortizationPeriod = +25;
  @observable income = +0;
  @observable credit_level = '';
  @observable credit_score = '';
  @observable comments = '';

  @action async getSettings() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/text; charset=UTF-8');
    //console.log('airl getting settings');
    const options = { method: 'POST', headers };
    var status;
    const request = new Request('http://www.airlfinancial.com/rest/api/init', options);
    const response = await fetch(request).then(function(res){
      status = res.status;
      //console.log('Response Status:' + status);
      return res.json();
    });
    //console.log('the response: ' + JSON.stringify(response));
    //console.log('new status: ' + status);
    this.airlFee = response['fee'];
    this.airlRate = response['rate'];
    this.airlAmortizationPeriod = response['amortization'];
    //console.log(this.airlAmortizationPeriod);
    return true;
  }

  @observable airlFee = 0;
  @observable airlRate = 0;
  @observable airlAmortizationPeriod = 0;
  @observable initialized = this.getSettings();
  @observable validated = true;
  @observable mortgagePayment(){
    var user = userStore.all;
    var userPayment = parseFloat(0);

    var P = this.totalMortgage;
    var I = this.interestRate / 100 / 12;
    var N = this.amortizationPeriod * 12;

    userPayment = Math.round(P * ( I * (Math.pow(1 + I, N)) / (Math.pow(1 + I, N) - 1)) * 100) / 100;
    //console.log('userpayment: ' + userPayment);
    return userPayment;
  }

  @computed get isValid(){
    return this.errors === null;
  }

  init() {
    autorun(() => this.runValidation());
  }

  runValidation() {
    let errors = null;
    const totalMortgage = this.totalMortgage.trim(),
          homeValue = this.homeValue.trim(),
          interestRate = this.interestRate.trim(),
          termYears = this.termYears.trim(),
          amortizationPeriod = this.amortizationPeriod.trim();

    if (totalMortgage === '') {
        errors = Object.assign({}, errors, {totalMortgage: 'Total Mortgage is required'})
    }
  }

  @action setField(field,data){
        //console.log('setting field: ' + field);
        userStore.all[field] = data;
        //console.log(userStore.all);
  }

  @action getField(field){
    //console.log('getting field: ' + field);
    //console.log('returning ' + userStore.all[field]);
      return userStore.all[field];
  }

  @action
  submit() {
    this.handleSubmission();

    when(
        () => !this.pending,
        () => {
            if (this.submitted){
                //console.log('performing some side effect');
            } else {
                //console.log('Failed');
            }
        });
  }

  async handleSubmission() {
      this.pending = true;
      this.submitted = false;

      try {
          const response = await this.makeServiceCall();

          runInAction(() => this.submitted = true);
      } catch (e) {
          runInAction(() => this.submitted = false);
      }
      finally {
          runInAction(() => this.pending = false);
      }
  }

  makeServiceCall() {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              if (Math.random() > 0.5) {
                  resolve(200);
              } else {
                  reject(500);
              }
          }, 2000);
      });
  }

  @action setConfID(confID){
    this.all.confirmation = confID;
  }

  @action getConfID(){
    return this.all.confirmation;
  }

}

autorun(() => {})


var userStore = window.userStore = new UserStore
export default userStore;
