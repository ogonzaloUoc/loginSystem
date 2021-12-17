var user = []
var saveButton = document.getElementById('save-button');

user = await obtainLoggedUserData()
displayLoggedUserData(user)

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

function displayLoggedUserData(user) {
    document.getElementById("username").value =  user[0].username;
    document.getElementById("email").value = user[0].email;
    document.getElementById("avatar").src = user[0].avatar; // avatar mostrado al usuario
    document.getElementById("avatarSrc").value = user[0].avatar; // avatar utilizado por bodyparser
}

function populateStorage() {
    localStorage.setItem('email', document.getElementById('email').value);
    localStorage.setItem('password', document.getElementById('password').value);
}

saveButton.onclick = populateStorage;
