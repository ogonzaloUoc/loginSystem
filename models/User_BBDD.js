var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema(
  {    
    username: {
        type: String, 
        required: [true, 'Username required']
    },
    email: {
        type: String, 
        required: [true, 'Email required']
    },
    password: {
        type: String, 
        required: [true, 'Password required']
    },
    avatar: {
        type: String, 
        required: [true, 'Avatar required']
    }
  },
);

// Virtual for user's URL
UserSchema
.virtual('url')
.get(function () {
  return '/users/' + this._id;
});

//Export model
module.exports = mongoose.model('User_BBDD', UserSchema);
