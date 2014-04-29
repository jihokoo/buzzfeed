window.app = angular.module('buzzfeed',
  ['ngCookies',
  'ngResource',
  'ui.bootstrap',
  'ui.router',
  'ui.select2',
  'buzzfeed.controllers',
  'buzzfeed.services',
  'buzzfeed.directives',
  'buzzfeed.filters'
  ]);

angular.module('buzzfeed.controllers',
  ['buzzfeed.controllers.index',
  'buzzfeed.controllers.navbar',
  'buzzfeed.controllers.user'
  ]);

angular.module('buzzfeed.services',
  ['buzzfeed.services.global',
  'buzzfeed.services.user'
  ]);