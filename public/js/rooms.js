const socket = io('http://localhost:3000')

var roomsTable = document.getElementById('roomsTable')

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