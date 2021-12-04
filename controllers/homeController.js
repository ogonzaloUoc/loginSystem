const path = require("path")

function home_get(_req, res) {
    res.sendFile(path.join(__dirname,'../views/home.html'))
}

module.exports = {
    home_get
}