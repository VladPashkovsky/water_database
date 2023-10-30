const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const { body } = require('express-validator')

/* GET users listing. */
router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 28 }),
  userController.register)
router.post('/login', userController.login)
router.get('/current', userController.current)
router.get('/refresh', userController.refresh)
router.get('/logout', userController.logout)

module.exports = router
