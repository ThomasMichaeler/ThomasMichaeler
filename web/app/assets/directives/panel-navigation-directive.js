(function(){
  'use strict';
  
  angular.module('tmApp')
    .directive('panelNavigation', panelNavigation);
  
  function panelNavigation() {
    return {
      restrict: 'AE',
      templateUrl: 'views/panel-navigation.html'
    };
  }
}());