let User = class {
    constructor(username, email, password, avatar) {
        this.id = Date.now()
        this.username = username
        this.email = email
        this.password = password
        this.avatar = avatar
    }
}

module.exports = {User};