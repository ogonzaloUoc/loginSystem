const express = require('express')

const loginController = require('../controllers/loginController')
const sharedFunctions = require('../libs/sharedFunctions')

const router = express.Router()

router.get('/login', loginController.login_get)
router.post('/login', loginController.login_post) 
router.get('/logged_user_data', sharedFunctions.resctrictAccess, loginController.loggedUser_get)

module.exports = router