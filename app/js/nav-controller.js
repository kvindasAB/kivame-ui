

angular.module('kivame.nav.controllers', [])

  .controller('NavController', ['$scope', '$rootScope', function($scope, $rootScope){

    $scope.navdata = {
        isNotFbLogged: true
    };

    $scope.$on('facebookStatusChanged', function(event, value){
       console.log("facebookStatusChanged");
       console.log(value);
       $rootScope.fbAuth = value;
       if(value && value.status === "connected"){
           console.log("user is connected");
           $scope.navdata.isNotFbLogged = false;
           $scope.$apply();
       }else{
           console.log("user is NOTS connected");
           $scope.navdata.isNotFbLogged = true;
           $scope.$apply();
       }
    });

  }]);
