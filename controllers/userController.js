var sharedData = require('../libs/sharedData')

function users_get(req, res) {
    res.render('users',  {
        users: sharedData.registeredUsersArray
    })
}

module.exports = { 
    users_get
}