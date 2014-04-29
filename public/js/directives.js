'use strict';
angular.module('buzzfeed.directives', [])
  .directive('parseUrl', function($compile) {
    var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
    return {
      restrict: 'A',
      require: 'ngModel',
      replace: true,
      scope: { props: '=parseUrl', ngModel: '=ngModel' },
      link: function compile(scope, element, attrs, controller) {
          scope.$watch('ngModel', function(value) {
            console.log("hello my name is thomas");
              angular.forEach(value.match(urlPattern), function(url) {
                  value = value.replace(url, "<a target=\"" + scope.props.target + "\" >" + url +"</a>");
              });

              var content = angular.element('<div></div>').html(value).contents();
              console.log(content);
              var res = $compile(content);
              element.html('');
              element.append(content);
              scope.onClick= function () {
                  console.log('clicked');
              };
              res(scope)
            });
      }
    };
  });
