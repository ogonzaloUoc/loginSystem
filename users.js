let User = class {
    constructor(username, email, password) {
        this.id = Date.now()
        this.username = username
        this.email = email
        this.password = password
    }
}

module.exports = {User};