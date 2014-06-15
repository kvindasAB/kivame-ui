'use strict';

/* Controllers */

angular.module('kivame.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {

        $scope.myname = "Whatever name";
        $scope.onButtonClick = function(name){
            console.log("button just clicked." + name);
        }



  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
