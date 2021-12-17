var user = []

user = await obtainLoggedUserData()
displayUsernameAndEmail(user)

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

function displayUsernameAndEmail(user) {
    document.getElementById("username").innerHTML =  user[0].username
    document.getElementById("avatar").src = user[0].avatar
}