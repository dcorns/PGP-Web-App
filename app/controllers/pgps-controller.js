'use strict';
//var ui = require('../js/ui');
//var pgpResources = require('../js/pgpResources');
module.exports = function (app) {
  app.controller('pgpsController', function ($scope, $http, tokenService) {
    var ux = tokenService.ui;
    var pgpResources = tokenService.pgpResources;
    angular.element(document).ready(function () {
      ux.startHidden();
      ux.setToggles();
    });
    //Check for authorization before loading notes
    $scope.token = tokenService.token;
    console.log($scope.token);
    //$scope.storage = window.sessionStorage;
    //$scope.token = $scope.storage.getItem('token');
    $http.defaults.headers.common.Authorization = $scope.token;
    $scope.pgps = [];
    $scope.resources = [];
    if ($scope.token) {
      $scope.getAllPgps = function () {
        $http({
          method: 'GET',
          url: '/api/v_0_0_1/pgps'
        }).success(function (data) {
          if (data) {
              $scope.pgps = data.n;
            var formIdx = $scope.storage.getItem('formIdx'),
              btnViewPgp = document.getElementById("btnviewpgp"),
              btnCreatePgp = document.getElementById("btncreatepgp");
            if(formIdx){
              $scope.selectedPgp = $scope.pgps[formIdx];
            }
            else{
              $scope.selectedPgp = $scope.pgps[0];
              $scope.storage.setItem('formIdx', $scope.pgps.indexOf($scope.selectedPgp));
            }
          }
          btnViewPgp.addEventListener('click', function(){
            $scope.storage.setItem('formIdx', $scope.pgps.indexOf($scope.selectedPgp));
          });
          btnCreatePgp.addEventListener('click', function(){
            $scope.storage.setItem('formIdx', $scope.pgps.indexOf($scope.selectedPgp));
          });
          btnViewPgp.className = 'nav_ul-li';
          btnCreatePgp.className = 'nav_ul-li';
        }).error(function (data, status) {
          console.log(data);
          console.log('error!');
          console.log(status);
        });
      };


      $scope.savePgp = function (pgp) {
        pgp.editing = null;
        $http.put('api/v_0_0_1/pgps/' + pgp._id, pgp)
          .success(function (data) {
            alert("PGP Saved");
          })
          .error(function (data) {
            console.dir(data);
            alert(data);
          });
      };

      //add resource functions to scope
      $scope = pgpResources($scope, $http);
      $scope.getAllResources();

      $scope.getAllPgps();

    }
  });
};
