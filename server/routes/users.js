const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')

/* GET users listing. */
router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/current', userController.current)

module.exports = router
