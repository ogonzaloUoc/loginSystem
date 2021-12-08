const express = require('express')

const usersController = require('../controllers/userController')
const sharedFunctions = require('../libs/sharedFunctions')

const router = express.Router()

router.get('/users', sharedFunctions.resctrictAccess, usersController.users_get)

module.exports = router