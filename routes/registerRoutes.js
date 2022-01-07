const express = require('express')
const registerRoutes = require('../controllers/registerController')

const router = express.Router()

router.get('/register', registerRoutes.register_get)
router.get('/register_bbdd', registerRoutes.register_get_BBDD)
router.post('/register', registerRoutes.register_post)
router.post('/register_bbdd', registerRoutes.register_post_BBDD)

module.exports = router