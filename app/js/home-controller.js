'use strict';

/* Controllers */

angular.module('kivame.home.controllers', [])
  .controller('HomeController', ['$scope', 'KivaService', function($scope, KivaService) {

        // CONSTANTS
        $scope.ITEMS_PER_SLIDE = 4;

        // ATTRIBUTES
        $scope.kivalist = null;
        $scope.APIreturn = [{ funded_amount: 0,
            short_image_url: 'http://www.kiva.org/img/w250/722269.jpg',
            funded_percentage: 0,
            borrower_name: 'Benkadi 5 Group',
            loan_amount: 950,
            long_description: 'The ten members of group Benkadi 5 are married women. They are on average 35 years old with four children, and most of them live in traditional families in N’Tessoni (Lobougoula township, Sikasso circle in Mali’s third administrative region).\r\n\r\nThey are collaborating with micro-finance institution Soro Yiriwaso to carry out their agricultural activities during the rainy season. This is their tenth loan cycle with Soro Yiriwaso; previous loans were paid back on time.\r\n\r\nMrs. Bintou’s cultivar of choice is rice; she is the second woman sitting from left to right in the photo of this group of women, Benkadi 5. With her loan, she plans to purchase one 50-kilo bag of fertilizer, 1 container of herbicide, and to pay for the plowing labor on 1.2 acres.\r\n\r\nAfter the harvest, production is sold in the village and in Sikasso, to a mixed-gender clientele paying cash or requesting credit.\r\n\r\nMrs. Bintou forecasts an average profit of 73,000 XOF per cycle. The revenue will allow her to repay her loan with its interest on the one hand, and on the other to support her husband with the family’s daily expenses.',
            image_id: 1622421,
            large_image_url: 'http://www.kiva.org/img/w800/722269.jpg',
            country_code: 'ML',
            country: 'Mali',
            short_description: 'to buy fertilizer and herbicide, and pay for plowing.',
            id: 722269 }][0]


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
            console.log("GONNA FLIP THE STUFF!!")
        }

  }]);
