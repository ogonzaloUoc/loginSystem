
var form = document.getElementById("userForm");

function getInfoForm(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;
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
}

function changeAvatar(image_src) {
    var userAvatar = document.getElementById("avatar")
    var avatarInput = document.getElementById("avatarSrc")
    userAvatar.src = image_src // Actualizamos imagen seleccionada
    avatarInput.value = image_src // Actualizamos el valor del input, utilizado por el bodyparser

}    