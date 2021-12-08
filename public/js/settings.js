var cookie = readCookie('session');

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

console.log("La cookie almacenada es: " + cookie)
//console.log("El usuario almacenado en la cookie es: " + document.cookie.user)

/*
var avatarPlayer = localStorage.getItem("avatar");
document.getElementById("avatar").src = avatarPlayer;

var valorUsername = localStorage.getItem("username");
document.getElementById("namePlayer").value = valorUsername;

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
