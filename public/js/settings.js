var loggedUserUsername = sessionStorage.getItem("loggedUserUsername");
var loggedUserEmail = sessionStorage.getItem("loggedUserEmail");
var loggedUserAvatar = sessionStorage.getItem("loggedUserAvatar");

console.log(loggedUserEmail)

document.getElementById("avatar").src = loggedUserAvatar;
document.getElementById("username").value = loggedUserUsername;
document.getElementById("email").value = loggedUserUsername;

/*
var userInput = document.getElementById("userInput");
userInput.addEventListener("keyup", function (event) {
    if (event.keycode === 13) {
        addName();
    }
});

function addName(){
    var userInput = document.getElementById("userInput").value;
    document.getElementById("namePlayer").value = userInput;
}

function changeInfo(){
    var username = document.getElementById("namePlayer").value;
    var avatar = document.getElementById("avatar").src;

    var usuario = [{username: username, avatar: avatar}];

    var addUsername = localStorage.setItem("username", usuario[0].username);
    var addAvatar = localStorage.setItem("avatar", usuario[0].avatar);
    alert("Saved!");
    window.location.href='http://localhost:3000/chooseMode.html'
}
*/
