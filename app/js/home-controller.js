'use strict';

/* Controllers */

angular.module('kivame.home.controllers', [])
  .controller('HomeController', ['$scope', 'KivaService', function($scope, KivaService) {

        // CONSTANTS
        $scope.ITEMS_PER_SLIDE = 4;

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
                $scope.createSlidesPerCategoryList(result);
                console.log(result);
                $scope.kivalist = result;
            });
        }

        $scope.createSlidesPerCategoryList = function(argCategoryList){
            _.forEach(argCategoryList, function(item){
                console.log("category..." + item);
               $scope.createSlidesPerCategory(item);
            });
        }

        $scope.createSlidesPerCategory = function(argCategory){
            argCategory.slides = [];
            var start, end;
            for(var i = 0; i < argCategory.loans.length/$scope.ITEMS_PER_SLIDE; i++){
                start = i * $scope.ITEMS_PER_SLIDE;
                end = (i * $scope.ITEMS_PER_SLIDE) + $scope.ITEMS_PER_SLIDE;
                end = end > argCategory.loans.length ? argCategory.loans.length : end;
                argCategory.slides.push(argCategory.loans.slice(start, end));
            }
        }

        $scope.onButtonClick = function(name){
            console.log("button just clicked." + name);
        }

        $scope.setProgress = function(progress) {
            var progressBarWidth = progress * $(".prog-cont").width()/ 100;
            $(".prog-bar").width(progressBarWidth).html(progress + "% ");
        }

        $scope.flipImage = function() {
            console.log(this)
            debugger
            // APPEND A BOX ONTO THE PAGE
            // POPULATE IT WITH THE SOME TEXT!!!
            $('body').append('<div class="loan-show"><h1>NAME</h1></div>')
            console.log("GONNA FLIP THE STUFF!!")
        }
        $scope.incrementCounter = function() {

        }

  }]);
