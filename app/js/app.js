'use strict';


// Declare app level module which depends on filters, and services
angular.module('kivame', [
  'ngRoute',
  'kivame.filters',
  'kivame.services',
  'kivame.directives',
  'kivame.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'MyCtrl1'});
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'MyCtrl2'});
  $routeProvider.when('/sidescroll', {templateUrl: 'partials/sidescroll.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
