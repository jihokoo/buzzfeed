//Setting up route
window.app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // start state params ---
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('main', {
          url:'/',
          templateUrl: 'views/index.html'
        })
          .state('main.search', {
            templateUrl: 'views/partials/searchResults.html'
          })
        .state('profile', {
          url:'/:userName',
          templateUrl: 'views/profile.html'
        });
    }
]);