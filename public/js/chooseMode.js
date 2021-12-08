var loggedUserData = []

obtainLoggedUserData()

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
        window.location = "http://localhost:3000/settings.html";
    }
}

async function obtainLoggedUserData() {    
    try {
        var response = await fetch('/logged_user_data');
        var data = []
        data.push((await response.json()))
        loggedUserData.push(data[0].user)
    } catch (e) {
        console.log('Booo');
    }
    console.log("Src del avatar del usuario: " + loggedUserData[0].avatar)
    storeLoggedUserData()
    displayLoggedUserData()
}

function storeLoggedUserData() {
    sessionStorage.setItem('loggedUserUsername', loggedUserData[0].username)
    sessionStorage.setItem('loggedUserEmail', loggedUserData[0].email)
    sessionStorage.setItem('loggedUserAvatar', loggedUserData[0].avatar) 
}

function displayLoggedUserData() {
    var loggedUserUsername = sessionStorage.getItem('loggedUserUsername')
    var loggedUserAvatar = sessionStorage.getItem("loggedUserAvatar")
    
    document.getElementById("username").innerHTML = loggedUserUsername
    document.getElementById("avatar").src = loggedUserAvatar
}

function getItemByKey (key, array) {
    var value;
    array.some(function (obj) {
        if (obj[key]) {
            value = obj[key];
            return true;
        }
        return false;
    });
    return value;
}