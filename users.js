let User = class {
    constructor(userName, email, password) {
        this.userName = userName
        this.email = email
        this.password = password
        this.id = Date.now()
    }
}

module.exports = {User};