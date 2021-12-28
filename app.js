const express = require('express')
const http = require('http')
const path = require("path")
const bodyParser = require('body-parser') // Access info from requests
const session = require('express-session') // Librería para la gestión de sesiones de usuarios

const { Room } = require('./models/room')
const { Player } = require('./models/player')

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

const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

init()

app.get('/rooms', (req, res) => {
    res.render('rooms', { rooms: rooms })
})

app.post('/rooms/create_room', (req, res) => {
    if(rooms[req.body.room] != null) {
        return res.redirect('/rooms')
    }
    rooms[req.body.room] = { users: {}}
    res.redirect('/rooms/'+ req.body.room)
    io.emit('room-created', req.body.room)
})

app.get('/rooms/:room', (req, res) => {
    res.sendFile(path.join(__dirname,'./views/onlineGame.html'))
    //res.render('room', { roomName: req.params.room })
})

var rooms = {}
var players = {}; // opponent: scoket.id of the opponent, symbol = "X" | "O", socket: player's socket
var unmatched;

var opponentSocket
var newRoom
var firstPlayer

io.on('connection', socket => {
    socket.on('new-player', (room, username) => {
        numberOfPlayersInRoom(room)
        .then(playersInRoom => {
            console.log('Number of players in room: ' + playersInRoom)
        })

        /*
        if (playersInRoom <= 2) {
            console.log('Inside the if statement\n')

            socket.join(room)

            setup(room, username, socket)
        
            socket.to(room).emit('user-connected', username) // Broadcasting
        }
        */
        

        /*
        if (hasOpponent(room)) {
            socket.emit("game.begin", { // Send the game.begin event to the player
                symbol: players[socket.id].symbol
            });
        }
        */

        /*
        
        join(socket); // Fill 'players' data structure

        if (opponentOf(socket)) { // If the current player has an opponent the game can begin
            socket.emit("game.begin", { // Send the game.begin event to the player
                symbol: players[socket.id].symbol
            });

            opponentOf(socket).emit("game.begin", { // Send the game.begin event to the opponent
                symbol: players[opponentOf(socket).id].symbol 
            });
        }

        // Event for when any player makes a move
        socket.on("make.move", function(data) {
            if (!opponentOf(socket)) {
                // This shouldn't be possible since if a player doens't have an opponent the game board is disabled
                return;
            }

            // Validation of the moves can be done here

            socket.emit("move.made", data); // Emit for the player who made the move
            opponentOf(socket).emit("move.made", data); // Emit for the opponent
        });

        socket.on('game.end', function() {
        });        

        // Event to inform player that the opponent left
        socket.on("disconnect", function() {
            if (opponentOf(socket)) {
            opponentOf(socket).emit("opponent.left");
            }
        }); 

        */             
    })
})

startListening()

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
        //rolling: true,
        resave: false,
        saveUninitialized: false
    } ));    

    app.set('view engine', 'pug')

    routes()

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
    server.listen(port, function(){
        console.log(`server is listening on port: ${port}\n`);
    });
}

function setup(room, username, socket) {
    if(opponentSocket === undefined) {
        newRoom = new Room(room)
        firstPlayer = new Player(username, undefined, 'X', socket)

        newRoom.addPlayer(firstPlayer)
        rooms[room] = newRoom

        opponentSocket = socket.id 
    } else {             
        var secondPlayer = new Player(username, opponentSocket, 'O', socket)
        newRoom.addPlayer(secondPlayer)
        firstPlayer.setOpponentSocket(socket)      
    }        
}

async function numberOfPlayersInRoom (room) {
    const sockets = await io.in(room).fetchSockets();
    return sockets.length
}

/*
function hasOpponent(room) {
    const sockets = await io.in(room).fetchSockets();
    var numOfSocketsInRoom = 0
   
    if (sockets.length == 2) {
        return true
    }
    return false
}
*/

function join(socket) {       
    players[socket.id] = {
        opponent: unmatched,
        symbol: "X",
        socket: socket
    };

    // If 'unmatched' is defined it contains the socket.id of the player who was waiting for an opponent
    // then, the current socket is player #2
    if (unmatched) { 
        players[socket.id].symbol = "O";
        players[unmatched].opponent = socket.id;
        unmatched = null;
    } else { //If 'unmatched' is not define it means the player (current socket) is waiting for an opponent (player #1)
        unmatched = socket.id;
    }
}

function opponentOf(socket) {
    if (!players[socket.id].opponent) {
        return;
    }
    return players[players[socket.id].opponent].socket;
}