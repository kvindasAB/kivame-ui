'use strict';

/* Controllers */

angular.module('kivame.sidescroll.controllers', [])
  .controller('SideScrollController', ['$scope', function($scope) {

        $scope.myname = "Whatever name";
        $scope.onButtonClick = function(name){
            console.log("button just clicked." + name);
        }



  }]);
