'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('kivame.services', []).
  factory('KivaService', [function() {
    var service = {};
    service.getRecommendedLoans = function(cb, params){
        console.log("service.getRecommendedLoans...");
        console.log(cb);
        var result = [];

        result.push(service.createMockCategory());
        result.push(service.createMockCategory());
        result.push(service.createMockCategory());
        cb(result);
        return result;
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
