const loggedUserData = []
let username
const roomName = window.location.pathname.split('/').pop()

try {
    var response = await fetch('/logged_user_data');    
    var data = []
    data.push((await response.json()))
    loggedUserData.push(data[0].user)
    username = loggedUserData[0].username
} catch (e) {
    console.log('failed to fetch logged user data');
}    

console.log("Room name: " + roomName)
console.log(username)
