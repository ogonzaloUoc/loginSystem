const path = require("path")
const FileSystem = require("fs")
const bcrypt = require('bcrypt') // Encriptado de contraseñas

const { User } = require('../models/user')
const registeredUsersFile = './storage/users.json'
const sharedFunctions = require('../libs/sharedFunctions')

var sharedData = require('../libs/sharedData')

function register_get(_req, res) {
    res.sendFile(path.join(__dirname,'../views/register.html'))
}

async function register_post(req, res) {
    const registerSuccessMessage = '<p>Registration successful</p> <meta http-equiv="refresh" content="3;url=/login" />'
    const registerFailureMessage_EmailAlreadyExists = "<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='/register'>Register again</a></div>"
    const registerFailureMessage_ServerError = "Registration failed: Internal server error"

    try{
        let userExists = sharedData.registeredUsersArray.find((data) => req.body.email === data.email)
        if (!userExists) {            
            saveUser(req, sharedData.registeredUsersArray)            
            res.send(registerSuccessMessage)
            return
        }
        res.send(registerFailureMessage_EmailAlreadyExists)

    } catch{
        res.send(registerFailureMessage_ServerError)
    }
}

async function saveUser(req) {
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    let newUser = new User(req.body.username, req.body.email, hashedPassword, req.body.avatarSrc)

    sharedData.registeredUsersArray.push(newUser)

    FileSystem.writeFile(registeredUsersFile, JSON.stringify(sharedData.registeredUsersArray), (cannotWriteFile) => {
        if (cannotWriteFile) {
            throw cannotWriteFile
        }
    });

    console.log(`\nUn nuevo usuario se ha registrado: 
    \n\tnombre de usuario: ${newUser.username}, 
    \n\temail: ${newUser.email}
    \n\tavatar: ${newUser.avatar}\n`)

    sharedFunctions.loadUsers()
}

module.exports = {
    register_get,
    register_post
}