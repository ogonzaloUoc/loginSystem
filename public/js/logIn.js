
var form = document.getElementById("userForm");

function checkInfo(){
    if(document.getElementById("inputEmail").value == localStorage.getItem("email") && (document.getElementById("inputPassword").value == localStorage.getItem("password"))){
        alert("Loged!");
        window.location.href = "http://localhost:3000/chooseMode.html";
    }
    else{
        alert("Something wrong!");
    }
}
