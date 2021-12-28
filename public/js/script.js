var socket = io()

const roomsTable = document.getElementById('rooms-table') 
const messageContainer = document.getElementById('message-container')  

var myTurn = true;
var symbol;

if(roomsTable == null) {
    // We are in the room view
    const roomName = window.location.pathname.split('/').pop()
    const username = await getLoggedUserUsername()
    socket.emit('new-player', roomName, username)

    // Binding buttons on the board
    $(function() {
        $(".board button").attr("disabled", true); // Disable board at the beginning
        $(".board> button").on("click", makeMove);
    });
} 

// We are in the rooms list view
socket.on('room-created', room => {
    var newRow = roomsTable.insertRow();

    var nameCell = newRow.insertCell();
    var roomName = document.createTextNode(room);
    nameCell.appendChild(roomName);

    var linkCell = newRow.insertCell()
    var roomLink = document.createElement('a')
    roomLink.href = `/rooms/${room}`
    roomLink.innerText = 'Join Room'
    linkCell.appendChild(roomLink)
})

socket.on('user-connected', name => {
    console.log(`The user: ${name} has connected.\n`)
    //console.log('Room: ' + room)
    //appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

// Bind event on players move
socket.on("move.made", function(data) {
    $("#" + data.position).text(data.symbol); // Render move

    // If the symbol of the last move was the same as the current player
    // means that now is opponent's turn
    myTurn = data.symbol !== symbol;
    var board = getBoardState()
    
    if (isWinner(board)) {
        if (myTurn) {
            $("#message").text("You lost.");
        } else {
            $("#message").text("You won!");
        }
        $(".board button").attr("disabled", true); // Disable board  
        socket.emit('game.end')      
        return
    }
    if (!isThereMovesAvailable(board)) {
        $("#message").text("Draw!");
        $(".board button").attr("disabled", true); // Disable board        
        return
    }
    renderTurnMessage()    
});

// Bind event for game begin
socket.on("game.begin", function(data) {
    symbol = data.symbol; // The server is assigning the symbol
    myTurn = symbol === "X"; // 'X' starts first
    renderTurnMessage();
});

// Bind on event for opponent leaving the game
socket.on("opponent.left", function() {
    $("#message").text("Your opponent left the game.");
    $(".board button").attr("disabled", true);
});

async function getLoggedUserUsername() {
    try {
        var loggedUserData = [];
        var data = [];
        var username;
        const response = await fetch('/logged_user_data');

        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        data.push((await response.json()))
        loggedUserData.push(data[0].user);
        username = loggedUserData[0].username;

        return username;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

function getBoardState() {
    var board = [];
    var row = []

    $('.board button').each(function() {
        var buttonValue = $(this).text() || ''
        row.push(buttonValue)
        if (row.length == 3) {
            board.push(row)
            row = []
        }
    });

    return board;
}
    
function isWinner(board) {
    var rows = board
    var columns = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
    var diagonalLeftToRight = [[ board[0][0], board[1][1], board[2][2] ]]
    var diagonalRightToLeft = [[ board[0][2], board[1][1], board[2][0] ]]
    
    var toCheck = rows.concat(columns, diagonalLeftToRight, diagonalRightToLeft)
    return toCheck.some(row =>         
        row.every(cell => cell == 'X') || row.every(cell => cell == 'O')
    )
}

function isThereMovesAvailable(board) {
    return board.some(row => 
        row.some(cell => 
            cell == ''
        )
    )
}

function renderTurnMessage() {
    if (!myTurn) { // If not player's turn disable the board
        $("#message").text("Your opponent's turn");
        $(".board button").attr("disabled", true);
    } else { // Enable it otherwise
        $("#message").text("Your turn.");
        $(".board button").removeAttr("disabled");
    }
}

function makeMove(e) {
    if (!myTurn) {
        return; // Shouldn't happen since the board is disabled
    }

    if ($(this).text().length) {
        return; // If cell is already checked
    }

    socket.emit("make.move", { // Valid move (on client side) -> emit to server
        symbol: symbol,
        position: $(this).attr("id")
    });
}

