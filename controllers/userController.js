var sharedData = require('../libs/sharedData')

function users_get(req, res) {
    res.render('users',  {
        users: sharedData.registeredUsersArray
    })
}

function updateUser_post(req, res) {

}

//function deleteUser_delete()

module.exports = { 
    users_get,
    updateUser_post
}