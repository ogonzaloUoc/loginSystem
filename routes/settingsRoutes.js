const express = require('express')

const settingsController = require('../controllers/settingsController')
const sharedFunctions = require('../libs/sharedFunctions')

const router = express.Router()

router.get('/settings', sharedFunctions.resctrictAccess, settingsController.settings_get)

module.exports = router