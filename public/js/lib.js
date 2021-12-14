async function obtainLoggedUserData() {    
    try {
        var response = await fetch('/logged_user_data');
        var data = []
        data.push((await response.json()))
        loggedUserData.push(data[0].user)
    } catch (e) {
        console.log('Booo');
    }    
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

export {
    obtainLoggedUserData,
    storeLoggedUserData,
    displayLoggedUserData
}