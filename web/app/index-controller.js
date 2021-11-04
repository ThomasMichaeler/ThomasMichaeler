(function() {
'use strict';

angular.module('tmApp')
  .controller('IndexController', IndexController);

  var injectParams = ['$http', '$timeout'];
  IndexController.$inject = injectParams;

  function IndexController($http, $timeout) {
    var vm = this;
    vm.navscroll = navscroll;
    vm.slide_count = 1;
    vm.slide_1 = false;
    vm.slide_2 = false;
    vm.contactscroll = contactscroll;
    vm.sendcontact = sendcontact;
    vm.contact = {};
    vm.sending = false;
    vm.success = false;
    vm.error = false;
    
    function navscroll() {
      if(vm.slide_1 === false && vm.slide_2 === false) {
        vm.slide_1 = true; 
      } else if(vm.slide_1 === true && vm.slide_2 === false) {
        vm.slide_1 = false;
      } else if(vm.slide_1 === true && vm.slide_2 === true) {
        vm.slide_1 = true;
        vm.slide_2 = false;
      } else {
        vm.slide_1 = false;
      }
    }
    
    function contactscroll() {
      vm.slide_2 = !vm.slide_2;
    }
  
    function sendcontact() {
      vm.sending = true;
      $http.post('resources/send.php', vm.contact)
        .success(function(data, status, headers, config) {
            vm.sending = false;
            vm.success = true;
            $timeout(function() {
              vm.contact = {};
              vm.success = false;
              vm.slide_2 = false;
            }, 2000);

        }).error(function(data, status, headers, config) {
            vm.sending = false;
            vm.error = true;
            $timeout(function() {
              vm.error = false;
              vm.slide_2 = false;
            }, 2000);
        });
    }

  }
  
}());