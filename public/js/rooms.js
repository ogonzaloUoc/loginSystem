const socket = io()

var roomsTable = document.getElementById('roomsTable')

if(roomsTable == null) {
    // We are in the room view
    const roomName = window.location.pathname.split('/').pop()
    const username = await getLoggedUserUsername()
        
    console.log("Room name: " + roomName)
    console.log("Username: " + username)
    
    socket.emit('new-user', roomName, username)
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

