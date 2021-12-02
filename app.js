const express = require('express')
const http = require('http')
const path = require("path")
const bodyParser = require('body-parser') // Access info from requests
const session = require('express-session') // Librería para la gestión de sesiones de usuarios
const pug = require('pug') // View engine
const FileSystem = require("fs")

const registeredUsersFile = './storage/users.json'
const restrictAccess = require('./libs/restrictAccess')
var sharedData = require('./libs/sharedData')

const homeRoutes = require('./routes/homeRoutes')
const loginRoutes = require('./routes/loginRoutes')
const registerRoutes = require('./routes/registerRoutes')
const logoutRoutes = require('./routes/logoutRoutes')

const app = express();
const server = http.createServer(app);

init()

function init() {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname,'./public')));

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

    app.set('view engine', 'pug')

    loadUsers()

    routes()

    startListening()
}

function printRegisteredUsersToConsole() {
    if (sharedData.registeredUsersArray !== undefined && sharedData.registeredUsersArray.length > 0) {

        console.log('Usuarios registrados:\n')
        sharedData.registeredUsersArray.forEach(user => {
            console.log(`\t${user.username}: ${user.email}`)
        })
        return
    }  
    console.log('Todavia no hay usuarios registrados\n')
}

function parseRegisteredUsers() {
    FileSystem.readFile(registeredUsersFile, 'utf8', (cantReadFile, usersFromFile) => {
        if (cantReadFile) {
            throw cantReadFile
        }
        sharedData.registeredUsersArray = JSON.parse(usersFromFile)  
        printRegisteredUsersToConsole() 
    })   
}

function loadUsers() {
    FileSystem.stat(registeredUsersFile, (fileNotExists, _stats) => {
        if (fileNotExists) {
            FileSystem.writeFileSync(registeredUsersFile, "[]", (cantWriteFile) => {
                if (cantWriteFile) {
                    throw cantWriteFile
                }
            })          
        }   
        parseRegisteredUsers()
    })        
}

function routes() {    
    app.use(homeRoutes)
    app.use(loginRoutes)
    app.use(registerRoutes)
    app.use(logoutRoutes)

    app.get('/users', restrictAccess, renderRegisteredUsers)   
}

function startListening() {
    server.listen(3000, function(){
        console.log("server is listening on port: 3000\n");
    });
}

function printRegisteredUsersToHtml(_req, res) {
    loadUsers()
    const printableUsers = JSON.stringify(sharedData.registeredUsersArray)
    res.send(`<div align ='center'><h2>Registered users:</h2></div><br><br><div align ='center'><p> ${printableUsers} </p></div>`)
}

function renderRegisteredUsers(req, res) {
    res.render('users',  {
        users: sharedData.registeredUsersArray
    })
}