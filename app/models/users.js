'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/buzzfeed');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("mongoose connection is open")
});

var Schema = mongoose.Schema

/**
 * User Schema
 */
var UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: String,
    userName: {
        type: String,
        unique: true
    },
    twitter: {},
    access_token: String,
    refresh_token: String,
    token: String,
    tokenSecret: String,
    avatarUrl: String,
    tweets: [{
        type: Schema.Types.Mixed
    }]
});

var User = mongoose.model('User', UserSchema);

module.exports = {"User": User};