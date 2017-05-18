import React from 'react';
import { observable, autorun, action, computed, reaction, when, runInAction } from 'mobx';

class UserStore {
  @observable all = {
    homeValue : 0,
    totalMortgage : 0,
    interestRate : 0,
    termYears : 0,
    amortizationPeriod : 0
  };

  @observable.ref errors = {};

  @observable pending = false;
  @observable submitted = false;

  @observable totalMortgage = 250000;
  @observable homeValue = 300000;
  @observable interestRate = 5;
  @observable termYears = 5;
  @observable amortizationPeriod = 25;

  @observable mortgagePayment(){
    var user = userStore.all;
    var userPayment = parseFloat(0);

    var P = user.totalMortgage;
    var I = user.interestRate / 100 / 12;
    var N = user.amortizationPeriod * 12;

    userPayment = Math.round(P * ( I * (Math.pow(1 + I, N)) / (Math.pow(1 + I, N) - 1)) * 100) / 100;
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
        userStore.all[field] = data;
        console.log(userStore.all);
  }

  @action
  submit() {
    this.handleSubmission();

    when(
        () => !this.pending,
        () => {
            if (this.submitted){
                console.log('performing some side effect');
            } else {
                console.log('Failed');
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

}

autorun(() => {

})


var userStore = window.userStore = new UserStore
export default userStore;
