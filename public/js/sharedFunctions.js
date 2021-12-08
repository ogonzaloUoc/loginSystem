function changeAvatar(image_src) {
    var userAvatar = document.getElementById("avatar")
    var avatarInput = document.getElementById("avatarSrc")
    userAvatar.src = image_src // Actualizamos imagen seleccionada
    avatarInput.value = image_src // Actualizamos el valor del input, utilizado por el bodyparser
}    

async function obtainLoggedUserData() {    
    try {
        var response = await fetch('/logged_user_data');
        var logged_user_data = []
        logged_user_data.push(JSON.stringify(await response.json()))
        console.log(logged_user_data);
    } catch (e) {
        console.log('Booo');
    }
}
