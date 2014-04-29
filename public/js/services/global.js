angular.module('buzzfeed.services.global', [])
  .factory('Global', [
    function() {
        var _this = this;
        _this._data = {
            user: window.user,
            location: location,
            authenticated: !!window.user
        };
        console.log("globla is processed");
        return _this._data;
    }
  ])