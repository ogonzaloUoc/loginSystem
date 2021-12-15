const socket = io('http://localhost:3000')

var roomsTable = document.getElementById('roomsTable')

/* Use one socket per client
We were using two scripts, one in the rooms list view 
and the other one in the room view. In each one of them 
we had an instance of socket.io. As the user navigates from
rooms list view to the room view, two sockets where created for
the same client. To prevent that we will filter the view and emit
events that only correspond to the particular view of the user.
*/

if(roomsTable != null) {
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
} else {
    // We are in the room view
    const roomName = window.location.pathname.split('/').pop()
    const username = await getLoggedUserUsername()

    console.log("Room name: " + roomName)
    console.log("Username outside function: " + username)

    /*
    socket.emit('new-user', roomName, username)

    socket.on('user-connected', name => {
        appendMessage(`${name} connected`)
    })    
    */
}

async function getLoggedUserUsername() {
    try {
        const response = await fetch('/logged_user_data');
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const json = await response.json();
        var loggedUserData = [];
        var data = [];
        data.push(json);
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

