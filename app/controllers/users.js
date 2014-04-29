var User = require('../models/users.js')['User'];

exports.login = function(req, res){
  res.render('login');
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};

exports.signin = function(req, res){
  // console.log('SIGN IN REDIRECT?');
  // res.set('content-type', 'text/javascript');
  res.render('index');
  // res.redirect('/');
};

exports.favorite = function(req, res){
  console.log(req.body.tweet.id_str)
  User.findOne({userName: req.user.userName}, function(err, user){
    if(user.tweets){
      console.log(user.tweets)
      console.log(req.body.tweet instanceof Array);
      user.tweets.push(req.body.tweet);
      user.save(function(err, user){
        console.log(err);
        console.log('has anything changed?', user.tweets)
        res.jsonp(user.tweets.pop());
      })
    } else{
      console.log('we should not be in here');
      user.tweets = [req.body.tweet];
      user.save(function(err, user){
        res.jsonp(user.tweets.pop());
      })
    }
  })
}

exports.findOne = function(req, res){
  console.log(req.query.userName);
  console.log(req.params);
  User.findOne({userName: req.params.userName}, function(err, user){
    res.jsonp(user);
  })
}