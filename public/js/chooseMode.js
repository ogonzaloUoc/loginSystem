var user = []

user = await obtainLoggedUserData()
storeLoggedUserData()
displayLoggedUserData()

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log(ev.dataTransfer.setData("text", ev.target.id));
}

function drop(ev) {
    if(ev.target.id == "modo1"){
        window.location = "http://localhost:3000/juego.html";
    }
    else if(ev.target.id == "modo2"){
        window.location = "http://localhost:3000/juego2.html";
    }
    else if(ev.target.id == "button"){
        window.location = "/settings";
    }
}

async function obtainLoggedUserData() {    
    try {
        var data = []
        var loggedUserData = []
        var response = await fetch('/logged_user_data');

        if (!response.ok) {
            throw new Error('Network response was not OK on fetch');
        }
        data.push((await response.json()))
        loggedUserData.push(data[0].user)
        
        return loggedUserData
    } catch (error) {
        console.log('There has been a problem with your fetch operation:', error);
    }
}

function storeLoggedUserData() {
    sessionStorage.setItem('loggedUserUsername', user[0].username)
    sessionStorage.setItem('loggedUserEmail', user[0].email)
    sessionStorage.setItem('loggedUserAvatar', user[0].avatar) 
}

function displayLoggedUserData() {
    var loggedUserUsername = sessionStorage.getItem('loggedUserUsername')
    var loggedUserAvatar = sessionStorage.getItem("loggedUserAvatar")
    
    document.getElementById("username").innerHTML = loggedUserUsername
    document.getElementById("avatar").src = loggedUserAvatar
}