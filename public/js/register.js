
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


function changeImg1(){
    var userAvatar = document.getElementById("avatar");   
    userAvatar.src = "http://localhost:3000/img/avatar1.png";
}
function changeImg2(){
    var userAvatar = document.getElementById("avatar");   
    userAvatar.src = "http://localhost:3000/img/avatar2.png";
}
function changeImg3(){
    var userAvatar = document.getElementById("avatar");   
    userAvatar.src = "http://localhost:3000/img/avatar3.png";
}
function changeImg4(){
    var userAvatar = document.getElementById("avatar");   
    userAvatar.src = "http://localhost:3000/img/avatar4.png";
}
function changeImg5(){
    var userAvatar = document.getElementById("avatar");   
    userAvatar.src = "http://localhost:3000/img/avatar5.png";
}
function changeImg6(){
    var userAvatar = document.getElementById("avatar");   
    userAvatar.src = "http://localhost:3000/img/avatar6.png";
}

function reef(){

    if(document.getElementById("inputEmail").value != "" && document.getElementById("inputPassword").value != "" && document.getElementById("inputUsername").value != "" && document.getElementById("avatar").src != "https://us.123rf.com/450wm/blankstock/blankstock1409/blankstock140900061/31369711-signo-de-interrogaci%C3%B3n-signo-icono-s%C3%ADmbolo-de-ayuda-signo-de-preguntas-frecuentes-c%C3%ADrculo-bot%C3%B3n-plan.jpg?ver=6"){
        alert("Lets Play!");
        window.location.href = "http://localhost:3000/chooseMode.html";
        }
    else{
        alert("Something wrong!");
    }
}
    