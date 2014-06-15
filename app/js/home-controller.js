'use strict';

/* Controllers */

angular.module('kivame.home.controllers', [])
  .controller('HomeController', ['$scope', 'KivaService', function($scope, KivaService) {

        // ATTRIBUTES
        $scope.kivalist = null;


        // METHODS
        $scope.init = function(){
            console.log("init...");
            $scope.requestLoans();
        }

        $scope.requestLoans = function() {
            console.log("requestLoans...");
            KivaService.getRecommendedLoans(function(result){
                console.log("getRecommendedLoans:...");
                console.log(result);
                $scope.kivalist = result;
            });
        }

        $scope.onButtonClick = function(name){
            console.log("button just clicked." + name);
        }

  }]);
