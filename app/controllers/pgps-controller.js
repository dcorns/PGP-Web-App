'use strict';
var ui = require('../js/ui');
var pgpResources = require('../js/pgpResources');
module.exports = function () {
  alert('pgps-controller');
  //app.controller('pgpsController', function ($scope, $http) {
  //  var ux = ui();
  //  angular.element(document).ready(function () {
  //    ux.startHidden();
  //    ux.setToggles();
  //  });
  //  //Check for authorization before loading notes
  //  var storage = window.sessionStorage;
  //  var token = storage.getItem('token');
  //  if (token) {
  //    $http.defaults.headers.common.Authorization = token;
  //    $scope.pgps = [];
  //    $scope.resources = [];
  //    $scope.getAllPgps = function () {
  //      $http({
  //        method: 'GET',
  //        url: '/api/v_0_0_1/pgps'
  //      }).success(function (data) {
  //        if (data) {
  //            $scope.pgps = data.n;
  //          var formIdx = storage.getItem('formIdx'),
  //            btnViewPgp = document.getElementById("btnviewpgp"),
  //            btnCreatePgp = document.getElementById("btncreatepgp");
  //          if(formIdx){
  //            $scope.selectedPgp = $scope.pgps[formIdx];
  //          }
  //          else{
  //            $scope.selectedPgp = $scope.pgps[0];
  //            storage.setItem('formIdx', $scope.pgps.indexOf($scope.selectedPgp));
  //          }
  //        }
  //        btnViewPgp.addEventListener('click', function(){
  //          storage.setItem('formIdx', $scope.pgps.indexOf($scope.selectedPgp));
  //        });
  //        btnCreatePgp.addEventListener('click', function(){
  //          storage.setItem('formIdx', $scope.pgps.indexOf($scope.selectedPgp));
  //        });
  //        btnViewPgp.className = 'nav_ul-li';
  //        btnCreatePgp.className = 'nav_ul-li';
  //      }).error(function (data, status) {
  //        console.log(data);
  //        console.log('error!');
  //        console.log(status);
  //      });
  //    };
  //    $scope.getAllPgps();
  //
  //    $scope.savePgp = function (pgp) {
  //      pgp.editing = null;
  //      $http.put('api/v_0_0_1/pgps/' + pgp._id, pgp)
  //        .success(function (data) {
  //          alert("PGP Saved");
  //        })
  //        .error(function (data) {
  //          console.dir(data);
  //          alert(data);
  //        });
  //    };
  //
  //    //add resource functions to scope
  //    $scope = pgpResources($scope, $http);
  //    $scope.getAllResources();
  //
  //  }
  //});
};
