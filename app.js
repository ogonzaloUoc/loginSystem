const express = require('express')
const http = require('http')
const path = require("path")
const bodyParser = require('body-parser') // Access info from requests
const session = require('express-session') // Librería para la gestión de sesiones de usuarios

const sharedFunctions = require('./libs/sharedFunctions')

const homeRoutes = require('./routes/homeRoutes')
const loginRoutes = require('./routes/loginRoutes')
const registerRoutes = require('./routes/registerRoutes')
const logoutRoutes = require('./routes/logoutRoutes')
const userRoutes = require('./routes/userRoutes')
const chooseModeRoutes = require('./routes/chooseModeRoutes')
const settingsRoutes = require('./routes/settingsRoutes')

const app = express();
const server = http.createServer(app);

init()

function init() {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname,'./public')));

    app.use(session({
        name: "userSession",
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

    routes()

    startListening()

    sharedFunctions.loadUsers()
}

function routes() {    
    app.use(homeRoutes)
    app.use(loginRoutes)
    app.use(registerRoutes)
    app.use(logoutRoutes)
    app.use(userRoutes)
    app.use(chooseModeRoutes)
    app.use(settingsRoutes)
}

function startListening() {
    server.listen(3000, function(){
        console.log("server is listening on port: 3000\n");
    });
}