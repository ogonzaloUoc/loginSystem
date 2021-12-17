const express = require('express')

const usersController = require('../controllers/userController')
const sharedFunctions = require('../libs/sharedFunctions')

const router = express.Router()

router.get('/users', sharedFunctions.resctrictAccess, usersController.users_get)
router.post('/update_user', sharedFunctions.resctrictAccess, usersController.updateUser_post)


module.exports = router