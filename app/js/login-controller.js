'use strict';

/* Controllers */

angular.module('kivame.login.controllers', [])
  .controller('LoginController', ['$scope', function($scope) {

        $scope.myname = "Whatever name";
        $scope.onButtonClick = function(name){
            console.log("button just clicked." + name);
        }



  }]);