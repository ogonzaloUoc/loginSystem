const session = require('express-session');
const FileSystem = require("fs")

const sharedData = require('../libs/sharedData')
const registeredUsersFile = './storage/users.json'
const sharedFunctions = require('../libs/sharedFunctions')

function users_get(req, res) {
    res.render('users',  {
        users: sharedData.registeredUsersArray
    })
}

function updateUser_post(req, res) {
    const updateSuccessMessage = '<p>Update successful</p> <meta http-equiv="refresh" content="3;url=/choosemode" />'
    const updateFailureMessage_ServerError = "Update failed: Internal server error"

    try {
        const indexOfUser = sharedData.registeredUsersArray.findIndex(el => el.id === req.session.user.id);
        if(indexOfUser > -1) {
            updateUser(req, indexOfUser)
            res.send(updateSuccessMessage)
            return
        }
        res.send(updateFailureMessage_ServerError)

    } catch {
        res.send(updateFailureMessage_ServerError)
    }
}

function updateUser(req, indexOfUser) {
    const oldUsername = sharedData.registeredUsersArray[indexOfUser].username

    sharedData.registeredUsersArray[indexOfUser].username = req.body.username
    sharedData.registeredUsersArray[indexOfUser].email = req.body.email
    sharedData.registeredUsersArray[indexOfUser].avatar = req.body.avatarSrc
    
    FileSystem.writeFile(registeredUsersFile, JSON.stringify(sharedData.registeredUsersArray), (cannotWriteFile) => {
        if (cannotWriteFile) {
            throw cannotWriteFile
        }
    });

    console.log(`\nEl usuario ${oldUsername} ha actualizado su perfil : 
    \tnombre de usuario: ${sharedData.registeredUsersArray[indexOfUser].username}, 
    \temail: ${sharedData.registeredUsersArray[indexOfUser].email}
    \tavatar: ${sharedData.registeredUsersArray[indexOfUser].avatar}\n`)

    // Actualizar datos de session
    req.session.user =  sharedData.registeredUsersArray[indexOfUser]

    req.session.save( err => {
        req.session.reload( err => {
          console.log('Session has been updated');
        });
      });

    // Es necesario actualizar localStorage?

    sharedFunctions.loadUsers()
}

//function deleteUser_delete()

module.exports = { 
    users_get,
    updateUser_post
}