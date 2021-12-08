const path = require("path")

function settings_get(req, res) {
    //res.write(req.session.user)
    res.sendFile(path.join(__dirname,'../views/settings.html'))
}

module.exports = {
    settings_get
}