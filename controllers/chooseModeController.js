const path = require("path")

function chooseMode_get(req, res) {
    res.sendFile(path.join(__dirname,'../views/chooseMode.html'))
}

module.exports = {
    chooseMode_get
}