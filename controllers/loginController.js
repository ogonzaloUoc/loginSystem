const path = require("path")
const bcrypt = require('bcrypt') // Encriptado de contraseñas

var sharedData = require('../libs/sharedData')

function login_get(_req, res) {
    res.sendFile(path.join(__dirname,'../public/login.html'))
}

function login_post(req, res) {
    const loginFailureMessage_InvalidEmailOrPasswd = "<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='/login'>login again</a></div>"
    const loginFailureMessage_ServerError = "Login failed: Internal server error"

    try{           
        let foundUser = sharedData.registeredUsersArray.find((data) => req.body.email === data.email)

        if (foundUser) {            
            let submittedPass = req.body.password;
            let storedPass = foundUser.password;
    
            const passwordsMatch = bcrypt.compare(submittedPass, storedPass); 

            if (passwordsMatch) {
                let username = foundUser.username;
                console.log(`\nConectado como:\n\n\t${username}\n`);
                req.session.user = foundUser;
                const loginSuccessMessage = `<div align ='center'><h2>login successful</h2></div><br><br><br>
                <div align ='center'>
                    <h3>Hello ${username}</h3>
                </div>
                <br>
                <br>
                <div align='center'>
                    <a href='/users'>List registered users</a>
                </div>
                <br>
                <br>
                <div align ='center'>
                    <form method="post" action="/logout" class="inline">
                        <input type="hidden" name="extra_submit_param" value="extra_submit_value">
                        <button type="submit" name="submit_param" value="submit_value" class="link-button">
                            logout
                        </button>
                    </form>
                </div>`
                res.send(loginSuccessMessage);
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

module.exports = {
    login_get,
    login_post
}