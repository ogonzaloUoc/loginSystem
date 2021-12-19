const express = require('express')

const usersController = require('../controllers/userController')
const sharedFunctions = require('../libs/sharedFunctions')

const router = express.Router()

router.get('/users', sharedFunctions.resctrictAccess, usersController.users_get)
router.post('/update_user', sharedFunctions.resctrictAccess, usersController.updateUser_post)
router.get('/update_user_password', sharedFunctions.resctrictAccess, usersController.updateUserPassword_get)
router.post('/update_user_password', sharedFunctions.resctrictAccess, usersController.updateUserPassword_post)


module.exports = router