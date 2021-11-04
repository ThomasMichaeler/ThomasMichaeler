(function(){
  'use strict';
  
  angular.module('tmApp')
    .directive('panelHome', panelHome);
  
  function panelHome() {
    return {
      restrict: 'AE',
      templateUrl: 'views/panel-home.html'
    };
  }

}());