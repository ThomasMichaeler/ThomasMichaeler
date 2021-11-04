(function(){
  'use strict';
  
  angular.module('tmApp')
    .directive('panelOverview', panelOverview);
  
  function panelOverview() {
    return {
      restrict: 'AE',
      templateUrl: 'views/panel-overview.html'
    };
  }

}());