'use strict';

/* Controllers */

angular.module('kivame.home.controllers', [])
  .controller('HomeController', ['$scope', 'KivaService', function($scope, KivaService) {

        // CONSTANTS
        $scope.ITEMS_PER_SLIDE = 4;

        // ATTRIBUTES
        $scope.kivalist = null;
        $scope.APIreturn = [{"funded_amount": 0, "funded_percentage": 0.0, "borrower_name": "Sokkriyas", "image": "Sokkriyas", "long_description": "Sokkriyas (in the photo), age 40, is a security guard for a nightclub in Phnom Penh city. He lives in a Phnom Penh suburb. He has three children, one son and two daughters. Two of his children have full-time employment and the other one attends school.\r\n\r\nHis wife sells nets and blankets. She orders nets and blankets from Vietnam, one of Cambodia\u2019s neighboring countries, and she resells them at a market in Phnom Penh. She wants to increase the volume of nets and blankets she buys and sells. \r\n\r\nHence, Sokkriyas applied for a loan to help his wife!\r\n", "loan_amount": 200, "country_code": "KH", "country": "Cambodia", "short_description": " to buy additional nets and blankets for resale. ", "id": 723010}][0]


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

  }]);
