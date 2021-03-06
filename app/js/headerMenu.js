/**
 * headerMenu
 * Created by dcorns on 8/18/15.
 * Change menu controls based on the name of the controller being routed
 */
'use strict';

module.exports = function($rootScope, $scope){
  var ctrl = 'homeController';
  $rootScope.$on('$routeChangeStart', function(evt, next){
    ctrl = next.$$route.controller;
    switch(ctrl){
      case 'homeController':
        $scope.listItems = [
          {
            name:'Calendar',
            route: 'https://www.codefellows.org/calendar'
          },
          {
            name:'Contact',
            route: 'http://support.codefellows.org'
          },
          {
            name: 'Sign In',
            route: '#login'
          }
        ];
        $scope.heading = 'Personal Growth Plan';
        break;
      case 'resourcesController':
        $scope.listItems = [
          {
            name:'Sign In',
            route: '#login'
          }
        ];
        $scope.heading = 'Personal Growth Plan';
        break;
      case 'loginController':
        $scope.listItems = [
          {
            name:'Calendar',
            route: 'https://www.codefellows.org/calendar'
          },
          {
            name:'Contact',
            route: 'http://support.codefellows.org'
          }
        ];
        break;
      default:
        $scope.listItems = [];
    }
  });
};