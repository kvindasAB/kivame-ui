'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('kivame.services', []).
  factory('KivaService', ['$http', '$window' , function($http, $window) {

    var service = {};
    service.URL_KIVA_TOKEN = "/ws/auth/kiva_request/";
    service.URL_KIVAME_LOGIN = "ws/auth/kiva_access/";

    service.URL_LOAN_LIST = "/mock/all_loans.json";

    service.URL_KIVA_LOGIN = "https://www.kiva.org/oauth/authorize?client_id=com.kivame&response_type=code&oauth_callback=oob&state=[STATE]&oauth_token=[OAUTH_TOKEN]";

    service.TOKEN_STATE = "[STATE]";
    service.OAUTH_TOKEN = "[OAUTH_TOKEN]";

    service.handleError = function(message, result){
        alert(message);
        console.log("Error occurred:");
        console.log(message);
        console.log(result);
    };

    service.loginKivaToken = function(cb, params){
        console.log("loginKivaToken...");
        $http.get(service.URL_KIVA_TOKEN).success(function(result){
            console.log("loginKivaToken...");
            console.log(result);
            cb(result);
        }).error(function(result){
            service.handleError("An error has occured while login with Kiva.", result);
        });
    };

    service.redirectToKivaLogin = function(cb, params){
        var tmpUrl = service.normalizeKivaRedirectUrl(service.URL_KIVA_LOGIN, params);
        $window.open(tmpUrl);
        cb();
    };

    service.normalizeKivaRedirectUrl = function(argUrl, argParams){
        return argUrl.replace(service.OAUTH_TOKEN, argParams.oauthToken)
                     .replace(service.TOKEN_STATE, "kivame");
    }

    service.loginKivame = function(cb, params){
        $http.post(service.URL_KIVAME_LOGIN, params)
        .success(function(result){
            console.log("loginKivame...");
            console.log(result);
            cb(result);
        }).error(function(result){
            service.handleError("An error has occured while login with Kiva.", result);
        });

    };

    service.getRecommendedLoans = function(cb, params){

        console.log('getRecommendedLoans...');
        console.log(params);
        var postBody = undefined;
        if(params && params.authResponse){
           postBody = {token: params.authResponse.accessToken};
            //params: {token: params.authResponse.accessToken}
        }

        $http.get(service.URL_LOAN_LIST, postBody)
        .success(function(result){
            console.log("allloanList...");
            console.log(result);
            cb(result);
        }).error(function(result){
            service.handleError("An error has occured while login with Kiva.", result);
        });

        /*
        console.log("service.getRecommendedLoans...");
        console.log(cb);
        var result = [];

        result.push(service.createMockCategory());
        result.push(service.createMockCategory());
        result.push(service.createMockCategory());
        cb(result);
        return result;
        */
    };

    service.createMockCategory = function(){
        var tmpLoans = [];

        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());

        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());

        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());

        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());
        tmpLoans.push(service.createMockLoan());

        return {
            id: Math.floor(Math.random()*50000),
            name: "My Category",
            loans: tmpLoans
        }
    };

    service.createMockLoan = function(){
        return {
            id: Math.floor(Math.random()*50000),
            description: "This person needs a loan ...."
        }
    };

    return service;

  }]);
