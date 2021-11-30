
var form = document.getElementById("userForm");

function getInfoForm(){
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var username = document.getElementById("inputUsername").value;
    var avatar = document.getElementById("avatar").src;

    let usuario = [{email: email, password: password, username: username, avatar: avatar}];
    

    console.log(usuario[0]);
    var addEmail = localStorage.setItem("email", usuario[0].email);
    var addPassword = localStorage.setItem("password", usuario[0].password);
    var addUsername = localStorage.setItem("username", usuario[0].username);
    var addAvatar = localStorage.setItem("avatar", usuario[0].avatar);

    valorEmail = localStorage.getItem("email");
    valorPassword = localStorage.getItem("password");
    valorUsername = localStorage.getItem("username");
    valorAvatar = localStorage.getItem("avatar");

    console.log("Se ha almacenado correctamente el correo: " + valorEmail + " la contraseña: " + valorPassword + " el username: " + valorUsername + " y el avatar: " + valorAvatar);
    reef();
}

function changeAvatar(image_src) {
    var userAvatar = document.getElementById("avatar");
    userAvatar.src = image_src
}

// Go to chooseMode.html after registration
    