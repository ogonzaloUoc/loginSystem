var loginButton = document.getElementById('login-button');

if (storageIsAvailable('localStorage')) {
    console.info("Yippee! We can use localStorage awesomeness");
    if(!localStorage.getItem('email')) {        
        populateStorage();
      }
    else {
        setAccessCredentials();
    }
} 
else {
    console.error("Too bad, no localStorage for us");
}
  
function storageIsAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            (storage && storage.length !== 0);
    }
}

function populateStorage() {
    localStorage.setItem('email', document.getElementById('email').value);
    localStorage.setItem('password', document.getElementById('password').value);
}

function setAccessCredentials() {
    var currentUsersEmail = localStorage.getItem('email');
    var currentUsersPassword = localStorage.getItem('password');
  
    document.getElementById('email').value = currentUsersEmail;
    document.getElementById('password').value = currentUsersPassword;
}

loginButton.onclick = populateStorage;