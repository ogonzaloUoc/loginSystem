const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt'); // Encriptado de contraseñas
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session'); // Librería para la gestión de sesiones de usuarios
//const sessionOptions = require('./sessionOptions').sessionOptions;

var users = []; // Almacenará los usuarios registrados, obtenidos del archivo users.json

const app = express();
const server = http.createServer(app);

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
  } )); // Valores de configuración de nuestra cookie de sesión

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/logIn.html'));
}); // Al cargar la página principal, mostramos el login

/* Registro:
Gestiona el registro de usuarios*/
app.post('/register', async (req, res) => {
    try{
        const FileSystem = require("fs"); // Comprobamos que tenemos acceso al sistema de archivos del ordenador
        FileSystem.readFile('users.json', 'utf8', (err, data) => {
            if(err){
                registerUser(req, users);
                res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./logIn.html'>login</a></div><br><br><div align='center'><a href='./register.html'>Register another user</a></div>");
                return;
            } // No existe el archivo users.json o no lo podemos leer
            users = JSON.parse(data); // Guardamos los contenidos del archivo users.json en el array users
            users.forEach(user => {
                console.log(`${user.username}: ${user.email}`);
            });
            let foundUser = users.find((data) => req.body.email === data.email); // Comprobamos si el email entrado en el formulario esta registrado
            if (!foundUser) {            
                registerUser(req, users);            
                res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./logIn.html'>login</a></div><br><br><div align='center'><a href='./register.html'>Register another user</a></div>");
            } else {
                res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./register.html'>Register again</a></div>");
            }
        }); // Intentamos leer el archivo del registro de usuarios      
    } catch{
        res.send("Registration failed: Internal server error");
    }
});

/* Login:
Gestiona el acceso de los usuarios a la aplicación*/
app.post('/login', async (req, res) => {
    try{              
        const FileSystem = require("fs"); // Comprobamos que tenemos acceso al sistema de archivos del ordenador
        FileSystem.readFile('users.json', 'utf8', (err, data) => {
            if(err){
                console.log(`Error reading file from disk: ${err}`); 
                res.send(`<div align ='center'><h2>No user registry is available, please register.</h2></div><br><br><br><div align='center'><a href='./register.html'>Register</a></div>`);
            } // No se puede leer el archivo users.json
            else {
                users = JSON.parse(data); // Guardamos los contenidos del archivo users.json en el array users                
                let foundUser = users.find((data) => req.body.email === data.email); // Comprobamos si el email entrado en el formulario esta registrado
                if (foundUser) {            
                    let submittedPass = req.body.password; 
                    let storedPass = foundUser.password;
                    const passwordMatches = bcrypt.compare(submittedPass, storedPass); 
                    if (passwordMatches) {
                        let username = foundUser.username;
                        console.log(`logged in as: ${username}`);
                        //req.session.user = foundUser;
                        res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${username}</h3></div><br><br><div align='center'><a href='./logIn.html'>logout</a></div>`);
                    } // Coinciden las contraseñas - Login validado
                    
                    else {
                        res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./logIn.html'>login again</a></div>");
                    } // No coinciden las contraseñas - Login fallido
                } // El correo del formulario existe en nuestro registro
                else {            
                    res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./logIn.html'>login again<a><div>");
                } // El correo del formulario no está registrado - Login fallido
            } // Se puede leer el archivo de registro de usuarios
        }); // Intentamos leer el archivo del registro de usuarios
    } catch{
        res.send("Login failed: Internal server error");
    } // Mensaje de error
});

async function registerUser(req, users) {
    let hashPassword = await bcrypt.hash(req.body.password, 10);            
    let newUser = {
        id: Date.now(),
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
    };
    
    users.push(newUser);
    console.log('User list', users);
    const FileSystem = require("fs"); // Comprobamos que tenemos acceso al sistema de archivos del ordenador
    FileSystem.writeFile('users.json', JSON.stringify(users), (err) => {
        if (err) throw err; 
    }); // Actualizamos o creamos el archivo de registro de usuarios users.json
}

server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});