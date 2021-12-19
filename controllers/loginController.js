const path = require("path")
const bcrypt = require('bcrypt') // Encriptado de contraseñas

var sharedData = require('../libs/sharedData')

function login_get(_req, res) {
    res.sendFile(path.join(__dirname,'../views/login.html'))
}

function login_post(req, res) {
    const loginFailureMessage_InvalidEmailOrPasswd = "<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='/login'>login again</a></div>"
    const loginFailureMessage_ServerError = "Login failed: Internal server error"

    try{           
        let foundUser = sharedData.registeredUsersArray.find((data) => req.body.email === data.email)

        if (foundUser) {            
            let submittedPass = req.body.password;
            let storedPass = foundUser.password;
    
            const passwordsMatch = bcrypt.compareSync(submittedPass, storedPass); 

            if (passwordsMatch) {
                let username = foundUser.username;
                console.log(`\nConectado como:\n\n\t${username}\n`);
                req.session.user = foundUser;
                res.redirect('/choosemode')
                return
            }            
            res.send(loginFailureMessage_InvalidEmailOrPasswd);
            return
        }             
        res.send(loginFailureMessage_InvalidEmailOrPasswd);
    } catch{
        res.send(loginFailureMessage_ServerError);
    }
}

function loggedUser_get(req, res) {
    if(req.session) {
        res.json({
            user: req.session.user
        })
    } else {
        res.json({})
    }
}

module.exports = {
    login_get,
    login_post,
    loggedUser_get
}