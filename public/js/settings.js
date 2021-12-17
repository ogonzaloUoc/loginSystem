var loggedUserUsername = sessionStorage.getItem("loggedUserUsername");
var loggedUserEmail = sessionStorage.getItem("loggedUserEmail");
var loggedUserAvatar = sessionStorage.getItem("loggedUserAvatar");

document.getElementById("avatar").src = loggedUserAvatar; // avatar mostrado al usuario
document.getElementById("avatarSrc").value = loggedUserAvatar; // avatar utilizado por bodyparser
document.getElementById("username").value = loggedUserUsername;
document.getElementById("email").value = loggedUserEmail;
