#! /usr/bin/env node

console.log('\nThis script populates a user to your database. \n\nSpecified database as argument'
+ '\n\t- e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true\n');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

const async = require('async')  
const mongoose = require('mongoose');

const connectDB = require('./connectDB')
const User = require('./models/User_BBDD')

var mongoDB = userArgs[0];

var users = []

function userCreate(username, email, password, avatar, cb) {
    userDetail = { 
        username: username,
        email: email,
        password: password,
        avatar: avatar
    }

    const user = new User(userDetail);
         
    user.save(function (err) {
      if (err) {
        cb(err, null);
        return;
      }
      console.log('New user: '+user);
      users.push(user)
      cb(null, user);
    });
}

function createUsers(cb) {
    async.series([
        function(callback) {
            userCreate('Patrick', 'patrick@email.com', 'yourRidiculousPassword',
             'this/should/be/a/path',callback);
        },       
        ], 
        // Optional callback
        cb);
}

connectDB()
  .then(() => {
    async.series([
        createUsers
    ],
    // Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('Users: '+users);
            
        }
        // All done, disconnect from database
        mongoose.disconnect();
    });
  }).catch((err) => {
      console.error(err)
  })


