'use strict';

/* Controllers */

angular.module('kivame.login.controllers', [])
  .controller('LoginController', ['$scope', '$window', '$location', 'KivaService', function($scope, $window, $location, KivaService) {

        // ATTRIBUTES

        $scope.oauth = {
            oauthToken: null,
            oauthTokenSecret: null
        };

        $scope.kivaCode = null;
        $scope.modeKivaCode = false;

        // METHODS

        $scope.onLoginWithKivaClick = function(){
            console.log("onLoginWithKivaClick...");
            KivaService.loginKivaToken(function(result){
                $scope.oauth.oauthToken = result.oauth_token;
                $scope.oauth.oauthTokenSecret = result.oauth_token_secret;

                $scope.redirectUserToKivaLogin($scope.oauth);
            });
        };

        $scope.redirectUserToKivaLogin = function(oauthData){
            console.log("redirectUserToKivaLogin....");
            console.log(oauthData);
            KivaService.redirectToKivaLogin(function(){
                $scope.modeKivaCode = true;
            }, oauthData);
        };

        $scope.onKivaCodeSubmitClick = function(){
            var params = {
                oauth_token: $scope.oauth.oauthToken,
                oauth_token_secret: $scope.oauth.oauthTokenSecret,
                verifier: $scope.kivaCode
            };
            KivaService.loginKivame(function(){
                console.log("onKivaCodeSubmitClick...");
                $location.path('home');
            }, params);
        };

  }])
  .controller('FBController', ['$scope', function($scope){


  }]);

