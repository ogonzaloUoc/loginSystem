const express = require('express')

const logoutController = require('../controllers/logoutController')
const restrictAccess = require('../libs/restrictAccess')


const router = express.Router()

router.post('/logout', restrictAccess, logoutController.logout_post)

module.exports = router