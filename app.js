var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var request = require('request');
var path = require('path');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var jade = require('jade');
var app = express();


var env = process.env.NODE_ENV || 'dev';
if('dev' == env){
  // configure
} else if('prod' == env){
  // configure
}

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.enable('jsonp callback');

app.use(morgan(env));
app.use(express.static(__dirname + '/public'));
app.use('/lib', express.static(__dirname + '/app/components'));
app.use(bodyParser());
app.use(methodOverride());
app.use(compress());
app.use(cookieParser());
app.use(passport.initialize());
app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true }}));

// https://apps.twitter.com/app/6095054/keys
passport.use(new TwitterStrategy({
    consumerKey: 'BHyRNVoZMqTdqmQdukFNS32N6',
    consumerSecret: 'bhtOqzB2M3afx4bGF7WsKncoTPp3pUPIFEr7Rp8I46eLBnC2pW',
    callbackURL: 'http://127.0.0.1/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done){
    User.findOne({'twitter.id': profile.id}, function(err, user){
      if(err){
        return done(err);
      }
      if(user){
        return done(null, user);
      } else{
        var newUser = new User({
          displayName: profile.displayName,
          userName: profile.username,
          twitter: profile._json
        });
        newUser.save();
        return done(null,newUser);
      }
    });
  }
));

var routes = require('./app/controllers/index.js');
var users = require('./app/controllers/users.js');

app.get('/', routes.index);
app.get('/login', users.login);
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

app.post('/search', function(req, res){
  // request('something')
});

app.listen(3000);