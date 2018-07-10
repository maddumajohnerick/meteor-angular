import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class RegisterCtrl extends Controller {
  register() {
    this.callMethod('registerUser', {
      username: this.email,
      email: this.email,
      password: this.password
    }, (err, data) => {
      if(err){
        this.handleError(err);
      } else {
        Meteor.loginWithPassword(this.email, this.password, (err) => {
          if(err){
            this.handleError(err)
          } else {
            delete this.email;
            delete this.password;
            this.$state.go('profile');
          }
        })
      }
    });
  }
  
  login() {
    this.$state.go('login');
  }
 
  handleError(err) {
    this.$log.error('Register error ', err);
    const title = err ? err.reason : 'Registration failed';
 
    this.$ionicPopup.alert({
      title: title,
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}
 
RegisterCtrl.$name = 'RegisterCtrl';
RegisterCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];