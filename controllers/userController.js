const session = require('express-session');
const FileSystem = require("fs")
const path = require("path")
const bcrypt = require('bcrypt') // Encriptado de contraseñas

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
            updateUserRecord(req, indexOfUser)
            res.send(updateSuccessMessage)
            return
        }
        res.send(updateFailureMessage_ServerError)

    } catch {
        res.send(updateFailureMessage_ServerError)
    }
}

function updateUserPassword_get(req, res) {
    res.sendFile(path.join(__dirname,'../views/updatePassword.html'))
}

/* TO DO:
- separar en una funcion por tarea o acción
- añadir comprobación campos en blanco
*/
async function updateUserPassword_post(req, res) {
    const updatePasswordSuccessMessage = '<p>Password updated successfully</p> <meta http-equiv="refresh" content="3;url=/choosemode"/>'
    const updatePasswordFailureMessage_ServerError = "Password update failed: Internal server error"
    const updatePasswordFailureMessage_PasswordsDontMatch = '<p>Password update failed: password entered does not match our records</p> <meta http-equiv="refresh" content="3;url=/update_user_password"/>'
    const updatePasswordFailureMessage_NewPasswordsDontMatch = '<p>Password update failed: new password doesn\'t match confirmation</p> <meta http-equiv="refresh" content="3;url=/update_user_password"/>'

    try {
        const indexOfUser = sharedData.registeredUsersArray.findIndex(el => el.id === req.session.user.id);

        if(indexOfUser > -1) {            
            const storedCurrentPassword = sharedData.registeredUsersArray[indexOfUser].password
            const submittedCurrentPassword = req.body.current_password
        
            const passwordsMatch = bcrypt.compareSync(submittedCurrentPassword, storedCurrentPassword)            
            
            if(passwordsMatch) {
                const newPassword = req.body.new_password
                const confirmedNewPassword = req.body.confirmed_new_password
        
                if(newPassword == confirmedNewPassword) {                    
                    storeNewPassword(req, indexOfUser, newPassword)
                    res.send(updatePasswordSuccessMessage)
                    return
                }                  
                res.send(updatePasswordFailureMessage_NewPasswordsDontMatch)
                return
            }
            res.send(updatePasswordFailureMessage_PasswordsDontMatch)
            return            
        }
        res.send(updatePasswordFailureMessage_ServerError)
    } catch {
        res.send(updatePasswordFailureMessage_ServerError)
    }
}

function updateUserRecord(req, indexOfUser) {
    const oldUsername = sharedData.registeredUsersArray[indexOfUser].username

    sharedData.registeredUsersArray[indexOfUser].username = req.body.username
    sharedData.registeredUsersArray[indexOfUser].email = req.body.email
    sharedData.registeredUsersArray[indexOfUser].avatar = req.body.avatarSrc
    
    FileSystem.writeFile(registeredUsersFile, JSON.stringify(sharedData.registeredUsersArray), (cannotWriteFile) => {
        if (cannotWriteFile) {
            throw cannotWriteFile
        }
    });

    console.log(`El usuario ${oldUsername} ha actualizado su perfil:\n
    \tnombre de usuario: ${sharedData.registeredUsersArray[indexOfUser].username}, 
    \temail: ${sharedData.registeredUsersArray[indexOfUser].email}
    \tavatar: ${sharedData.registeredUsersArray[indexOfUser].avatar}\n`)

    sharedFunctions.updateSession(req, sharedData.registeredUsersArray[indexOfUser])    

    sharedFunctions.loadUsers()
}

async function storeNewPassword(req, indexOfUser, newPassword) {
    const oldUsername = sharedData.registeredUsersArray[indexOfUser].username

    let hashedPassword =  bcrypt.hashSync(newPassword, 10)
    sharedData.registeredUsersArray[indexOfUser].password = hashedPassword
                    
    FileSystem.writeFile(registeredUsersFile, JSON.stringify(sharedData.registeredUsersArray), (cannotWriteFile) => {
        if (cannotWriteFile) {
            throw cannotWriteFile
        }
    });

    console.log(`El usuario ${oldUsername} ha actualizado su contraseña\n`)

    sharedFunctions.updateSession(req, sharedData.registeredUsersArray[indexOfUser])    

    sharedFunctions.loadUsers()
}

//function deleteUser_delete()

module.exports = { 
    users_get,
    updateUser_post,
    updateUserPassword_get,
    updateUserPassword_post
}