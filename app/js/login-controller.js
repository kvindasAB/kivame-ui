'use strict';

/* Controllers */

angular.module('kivame.login.controllers', [])
  .controller('LoginController', ['$scope', '$window', 'KivaService', function($scope, $window, KivaService) {

        $scope.oauth = {
            oauthToken: null,
            oauthTokenSecret: null
        };

        $scope.onLoginWithKivaClick = function(){
            console.log("onLoginWithKivaClick...");
            KivaService.loginKivaToken(function(result){
                $scope.oauth.oauthToken = result.oauth_token;
                $scope.oauth.oauthTokenSecret = result.oauth_token_secret;

                $scope.redirectUserToKivaLogin($scope.oauth);
            });
        }

        $scope.redirectUserToKivaLogin = function(oauthData){
            console.log("redirectUserToKivaLogin....");
            console.log(oauthData);
            KivaService.redirectToKivaLogin(function(){

            }, oauthData);
        }




  }]);