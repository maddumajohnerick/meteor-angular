import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class LoginCtrl extends Controller {
  login() {
    Meteor.loginWithPassword(this.email, this.password, (err) => {
      if(err){
        this.handleError(err)
      } else {
        delete this.email;
        delete this.password;
        this.$state.go('tab.chats');
      }
    })
  }
  
  register() {
    this.$state.go('register');
  }
 
  handleError(err) {
    this.$log.error('Login error ', err);
 
    this.$ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}
 
LoginCtrl.$name = 'LoginCtrl';
LoginCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];