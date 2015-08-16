'use strict';
var angular = require('angular');
var bannerController = require('./controllers/bannerController');
var pgpApp = angular.module('pgpApp', [])
  .controller('firstController', function($scope){
  $scope.testthis = 'testthis';
});
pgpApp.controller('bannerController', ['$scope', bannerController]);