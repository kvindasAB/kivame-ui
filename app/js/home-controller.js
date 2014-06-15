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

        // Slides test

        $scope.myInterval = 5000;
          var slides = $scope.slides = [];
          $scope.addSlide = function() {
            var newWidth = 600 + slides.length;
            slides.push({
              image: 'http://placekitten.com/' + newWidth + '/300',
              text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
          };
          for (var i=0; i<4; i++) {
            $scope.addSlide();
          }

  }]);
