var loggedUserUsername = sessionStorage.getItem("loggedUserUsername");
var loggedUserEmail = sessionStorage.getItem("loggedUserEmail");
var loggedUserAvatar = sessionStorage.getItem("loggedUserAvatar");

document.getElementById("avatar").src = loggedUserAvatar;
document.getElementById("username").value = loggedUserUsername;
document.getElementById("email").value = loggedUserEmail;
