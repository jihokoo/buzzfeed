angular.module('buzzfeed.controllers.navbar', [])
  .controller('NavbarController', ['$scope', 'Global', function($scope, Global){
    $scope.global = Global;
  }])