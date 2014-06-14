'use strict';

/* Controllers */

angular.module('kivame.home.controllers', [])
  .controller('HomeController', ['$scope', function($scope) {

        $scope.myname = "Whatever name";
        $scope.onButtonClick = function(name){
            console.log("button just clicked." + name);
        }



  }]);
