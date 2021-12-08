const express = require('express')

const chooseModeController = require('../controllers/chooseModeController')
const sharedFunctions = require('../libs/sharedFunctions')

const router = express.Router()

router.get('/choosemode', sharedFunctions.resctrictAccess, chooseModeController.chooseMode_get)

module.exports = router