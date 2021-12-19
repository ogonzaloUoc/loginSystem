//const pug = require('pug') // View engine
const FileSystem = require("fs")
const path = require("path")

const registeredUsersFile = './storage/users.json'
var sharedData = require('./sharedData')

function resctrictAccess(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).send('<p>Access forbidden. No credentials provided</p>')
  }
}

function updateSession(req, user) {
  req.session.user =  user

  req.session.save( err => {
      req.session.reload( err => {
        //console.log('Session has been updated\n');
      });
    });
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
  ensureDirectoryExistence(registeredUsersFile)
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

function userJoinRoom(id, username, room) {
  const user = { id, username, room };

  sharedData.users.push(user);

  return user;
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (FileSystem.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  FileSystem.mkdirSync(dirname);
}

  module.exports = {
    resctrictAccess,
    updateSession,
    loadUsers,
    printRegisteredUsersToHtml,
    renderRegisteredUsers,
    userJoinRoom
  }