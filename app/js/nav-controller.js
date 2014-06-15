

angular.module('kivame.nav.controllers', [])

  .controller('NavController', ['$scope', function($scope){

    $scope.isNotFbLogged = true;

    $scope.isLoggedInFB = function() {
      if (FB.getUserID() != ""){
        $scope.isNotFbLogged = false;
      }
    }

  }]);
