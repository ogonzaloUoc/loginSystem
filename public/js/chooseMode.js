var user = []

user = await obtainLoggedUserData()
displayUsernameAndEmail(user)

document.getElementById('avatar').addEventListener('dragstart', drag)

const settingsButton = document.getElementById('settingsButton')
settingsButton.addEventListener('drop', drop)
settingsButton.addEventListener('dragover', allowDrop)
settingsButton.addEventListener('click', () => {location.href='/settings'})
//onclick="location.href='/settings'"

const modoLocal = document.getElementById('modoLocal')
modoLocal.addEventListener('drop', drop)
modoLocal.addEventListener('dragstart', () => { return false })
modoLocal.addEventListener('dragover', allowDrop)

const modoOnline = document.getElementById('modoOnline')
modoOnline.addEventListener('drop', drop)
modoOnline.addEventListener('dragstart', () => { return false })
modoOnline.addEventListener('dragover', allowDrop)

function allowDrop(ev) {
    ev.preventDefault();
    ev.dataTransfer.effectAllowed = "move";
}

function drag(ev) {
    console.log(ev.dataTransfer.setData("text", ev.target.id));
}

function drop(ev) {
    ev.preventDefault();

    if(ev.target.id == 'modoLocal'){
        window.location = 'http://localhost:3000/juego.html';
    }
    else if(ev.target.id == 'modoOnline'){
        window.location = '/rooms';
    }
    else if(ev.target.id == 'settingsButton'){
        window.location.href = '/settings';
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