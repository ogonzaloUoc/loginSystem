const express = require('express')
const loginController = require('../controllers/loginController')

const router = express.Router()

router.get('/login', loginController.login_get)
router.post('/login', loginController.login_post) 

module.exports = router