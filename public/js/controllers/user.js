angular.module('buzzfeed.controllers.user', [])
  .controller('UserController', ['$scope', '$http', '$stateParams', 'Global', function($scope, $http, $stateParams, Global){
    $scope.global = Global;
    $scope.findOne = function(){
      $scope.tweetsArray = [];
      console.log($stateParams.userName)
      $http.get('/user/'+$stateParams.userName)
        .success(function(data){
          console.log('tweetsArray');
          for(var i in data.tweets){
            console.log('jiji')
            $scope.tweetsArray.push(data.tweets[i]);
          }
          console.log(data);
          console.log($scope.tweetsArray);
        })
    }

    $scope.parseTwitterDate = function(created_at){
    // convert to local string and remove seconds and year //
      var date = new Date(Date.parse(created_at)).toLocaleString().substr(0, 16);
    // get the two digit hour //
      var hour = date.substr(-5, 2);
    // convert to AM or PM //
      var ampm = hour<12 ? ' AM' : ' PM';
      if (hour>12) hour-= 12;
      if (hour==0) hour = 12;
    // return the formatted string //
      return date.substr(0, 11) + hour + date.substr(13) + ampm;
    }

    $scope.props = {
        target: '_blank',
        otherProp: 'otherProperty'
    };
  }])