const express = require('express')

const logoutController = require('../controllers/logoutController')
const sharedFunctions = require('../libs/sharedFunctions')


const router = express.Router()

router.post('/logout', sharedFunctions.resctrictAccess, logoutController.logout_post)

module.exports = router