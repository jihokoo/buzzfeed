angular.module('buzzfeed.controllers.index', [])
  .controller('IndexController', ['$scope', '$http', '$state', 'Global', function($scope, $http, $state, Global){
    $scope.global = Global;
    $scope.searchNew = function(){
      console.log("hello")
      $http.get('/searchNew')
        .success(function(data){
          console.log(data);
          $scope.initialTweets = data.statuses;
        })
    };

    $scope.search = function(){
      console.log('hello');
      $http.post('/search', {keyWords: this.keyWords})
        .success(function(data){
          console.log(data);
          $scope.searchedTweets = data.statuses;
          $state.go('main.search');
        })
    };

    $scope.idArray = [];

    $scope.favorite = function(tweet){
      $http.post('/favorite', {tweet: tweet})
        .success(function(data){
          console.log('data', data);
          console.log('id', data.id_str);
          $scope.idArray.push(data.id_str);
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


// https://gist.github.com/jakemmarsh/6008983
// filter to parse url's and create links

