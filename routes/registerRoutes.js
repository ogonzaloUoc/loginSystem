const express = require('express')
const registerRoutes = require('../controllers/registerController')

const router = express.Router()

router.get('/register', registerRoutes.register_get)
router.post('/register', registerRoutes.register_post)

module.exports = router