'use strict';


// Declare app level module which depends on filters, and services
angular.module('kivame', [
  'ngRoute',
  'ui.bootstrap',
  'kivame.filters',
  'kivame.services',
  'kivame.directives',
  'kivame.home.controllers',
  'kivame.login.controllers',
  'kivame.sidescroll.controllers',
  'kivame.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginController'});
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
  $routeProvider.when('/sidescroll', {templateUrl: 'partials/sidescroll.html', controller: 'SideScrollController'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
