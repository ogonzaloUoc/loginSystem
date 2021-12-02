const path = require("path")

function home_get(_req, res) {
    res.sendFile(path.join(__dirname,'../public/home.html'))
}

module.exports = {
    home_get
}