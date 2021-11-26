const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt'); // Encriptado de contraseñas
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session'); // Librería para la gestión de sesiones de usuarios
const FileSystem = require("fs");
const { User } = require('./users');
const registeredUsersFile = 'users.json'
const restrictedMiddleware = require('./restricted-middleware.js')
const logout = require('./logout.js')
//const sessionOptions = require('./sessionOptions.js').sessionOptions;

var registeredUsersArray = [];

const app = express();
const server = http.createServer(app);

init()
registerRoutes()
startListening()

function init() {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname,'./public')));

    //app.use(sessionOptions)    
    app.use(session({
        name: "micookie",
        secret: "lascookiessonbuenas",
        cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
        },
        resave: false,
        saveUninitialized: false
    } ));    

    loadUsers()
}

function loadUsers() {
    FileSystem.stat(registeredUsersFile, (fileNotExists, _stats) => {
        if (fileNotExists) {
            FileSystem.writeFile(registeredUsersFile, "[]", (cantWriteFile) => {
                if (cantWriteFile) {
                    throw cantWriteFile
                }
            })          
        }   

        FileSystem.readFile(registeredUsersFile, 'utf8', (cantReadFile, usersFromFile) => {
            if (cantReadFile) {
                throw cantReadFile
            }
            registeredUsersArray = JSON.parse(usersFromFile)      
            printRegisteredUsersToConsole()                
        })         
    })        
}

function registerRoutes() {
    app.get('/', root)
    app.post('/register', register)
    app.post('/login', login) 
    app.get('/users', restrictedMiddleware, printRegisteredUsersToHtml)   
    app.get('/logout', logout)
}

function startListening() {
    server.listen(3000, function(){
        console.log("server is listening on port: 3000\n");
    });
}

async function root(req, res) {
        res.sendFile(path.join(__dirname,'./public/logIn.html'))
}

async function register(req, res) {
    const registerSuccessMessage = "<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./logIn.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>"
    const registerFailureMessage_EmailAlreadyExists = "<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>"
    const registerFailureMessage_ServerError = "Registration failed: Internal server error"

    try{
        let userExists = registeredUsersArray.find((data) => req.body.email === data.email)
        if (!userExists) {            
            saveUser(req, registeredUsersArray)            
            res.send(registerSuccessMessage)
            return
        }
        res.send(registerFailureMessage_EmailAlreadyExists)

    } catch{
        res.send(registerFailureMessage_ServerError)
    }
}

async function login(req, res) {
    const loginFailureMessage_InvalidEmailOrPasswd = "<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./logIn.html'>login again</a></div>"
    const loginFailureMessage_ServerError = "Login failed: Internal server error"

    try{           
        let foundUser = registeredUsersArray.find((data) => req.body.email === data.email)

        if (foundUser) {            
            let submittedPass = req.body.password;
            let storedPass = foundUser.password;
    
            const passwordsMatch = bcrypt.compare(submittedPass, storedPass); 

            if (passwordsMatch) {
                let username = foundUser.username;
                console.log(`\nConectado como:\n\n\t${username}\n`);
                req.session.user = foundUser;
                const loginSuccessMessage = `<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${username}</h3></div><br><br><div align='center'><a href='./logIn.html'>logout</a></div>`
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

async function saveUser(req, usersArray) {
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    let newUser = new User(req.body.username, req.body.email, hashedPassword)

    usersArray.push(newUser)
    console.log(usersArray)

    FileSystem.writeFile(registeredUsersFile, JSON.stringify(usersArray), (cannotWriteFile) => {
        if (cannotWriteFile) {
            throw cannotWriteFile
        }
    });

    console.log(`Un nuevo usuario se ha registrado: \n\tnombre de usuario: ${newUser.username}, \n\temail: ${newUser.email}`)
}

function printRegisteredUsersToConsole() {
    if (registeredUsersArray !== undefined && registeredUsersArray.length > 0) {

        console.log('Usuarios registrados:\n')
        registeredUsersArray.forEach(user => {
            console.log(`\t${user.username}: ${user.email}`)
        })
        return
    }  
    console.log('Todavia no hay usuarios registrados\n')
}

function printRegisteredUsersToHtml(_req, res) {
    loadUsers()
    const printableUsers = JSON.stringify(registeredUsersArray)
    res.send(`<div align ='center'><h2>Registered users:</h2></div><br><br><div align ='center'><p> ${printableUsers} </p></div>`)
}