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
var mongoose = require('mongoose');
var TwitterStrategy = require('passport-twitter').Strategy;
var jade = require('jade');
var request = require('request');
var util = require('util');
var twitter = require('twitter');
var twit = new twitter({
  consumer_key: 'ci0Q6SK0f8PXtr5gYarml7biZ',
  consumer_secret: 'YW7MZm9uXYQ5JSfDtXLjkwpM4LQuixRsjDUc2bwlhqQGD3qFRk',
  access_token_key: '1931356736-M7pD8Wmn6mzq6kXmOPpe9GWzry3nWJuYJasPrc3',
  access_token_secret: 'spGSgct45blGtMKca469NpoOgU8nQxtOC6rvzIdpyF6vR'
});
var mongoStore = require('connect-mongo')({session: session});
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
app.use(compress());
app.use(cookieParser('keyboard cat'));
app.use(bodyParser());
app.use(methodOverride());
app.use(session({
  secret: 'keyboard cat',
  store: new mongoStore({
    url: 'mongodb://heroku_app24672534:n1aakvv8tt20ccjhuoqpe178th@ds037478.mongolab.com:37478/heroku_app24672534',
    collection: 'sessions'
  }),
  proxy: false,
  cookie: {
    secure: false,
    httpOnly: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use('/lib', express.static(__dirname + '/app/components'));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserialize the user object based on a pre-serialized token
// which is the user id
passport.deserializeUser(function(id, done) {
  console.log('deserializeUser')
  User.findOne({
      _id: id
  }, function(err, user) {
      done(err, user);
  });
});


var User = require('./app/models/users.js')['User'];

// https://apps.twitter.com/app/6095054/keys
passport.use(new TwitterStrategy({
    consumerKey: 'ci0Q6SK0f8PXtr5gYarml7biZ',
    consumerSecret: 'YW7MZm9uXYQ5JSfDtXLjkwpM4LQuixRsjDUc2bwlhqQGD3qFRk',
    callbackURL: 'http://buzzfeedjihokoo.herokuapp.com/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done){
    console.log("we get inside the verify callback")
    User.findOne({'twitter.id_str': profile.id}, function(err, user){
      if(err){
        return done(err);
      }
      if(user){
        user.fullName = profile.displayName;
        user.userName = profile.username;
        user.twitter = profile._json;
        avatarUrl = profile._json.profile_image_url;
        token = token;
        tokenSecret = tokenSecret;
        user.save(function(err, user){
          return done(null, user);
        })
      } else{
        console.log('profile image url', profile._json.profile_image_url)
        var newUser = new User({
          fullName: profile.displayName,
          userName: profile.username,
          twitter: profile._json,
          avatarUrl: profile._json.profile_image_url,
          token: token,
          tokenSecret: tokenSecret
        });
        newUser.save();
        return done(null, newUser);
      }
    });
  }
));

var routes = require('./app/controllers/index.js');
var users = require('./app/controllers/users.js');

app.get('/', routes.index);
app.get('/login', users.login);
app.get('/logout', users.logout);
app.get('/user/:userName', users.findOne);
app.get('/searchNew', function(req, res){
  twit.search('#buzzfeed OR @buzzfeed', {count: 100}, function(data){
    res.jsonp(data);
  })
});

app.post('/favorite', users.favorite);
app.get('/auth/twitter', passport.authenticate('twitter'), users.signin);
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

app.post('/search', function(req, res){
  console.log("in the search new function");
  twit.search(req.body.keyWords, {count: 100}, function(data){
    console.log(util.inspect(data));
    res.jsonp(data);
  })
});

app.listen(process.env.PORT, function(){
  console.log('Express server listening on port ' + app.get('port'));
});