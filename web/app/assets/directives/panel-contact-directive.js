(function(){
  'use strict';
  
  angular.module('tmApp')
    .directive('panelContact', panelContact);
  
  function panelContact() {
    return {
      restrict: 'AE',
      templateUrl: 'views/panel-contact.html'
    };
  }

}());