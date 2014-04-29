angular.module('buzzfeed.filters', [])
  .filter('parseUrl', function() {
  var  //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim,
    //Change email addresses to mailto:: links.
    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;

    return function(text, target, otherProp) {
        angular.forEach(text.match(replacePattern1), function(url) {
          text = text.replace(replacePattern1, '<a href=\"$1\" target=\"_blank\">$1</a>');
        });
        angular.forEach(text.match(replacePattern2), function(url) {
          text = text.replace(replacePattern2, '$1<a href=\"http://$2\" target=\"_blank\">$2</a>');
        });
        angular.forEach(text.match(replacePattern3), function(url) {
          text = text.replace(replacePattern3, '<a href=\"mailto:$1\">$1</a>');
        });

        return text;
    };
});