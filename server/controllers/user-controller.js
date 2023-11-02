const { prisma } = require('../prisma/prisma-client')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../services/user-service')

class UserController {

  async register(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Invalid email or password', errors.array()))
      }

      const { name, email, password } = req.body

      const userData = await userService.signUp(name, email, password)
      res.cookie('refreshToken', userData.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body

      const userData = await userService.signIn(email, password)
      res.cookie('refreshToken', userData.refreshToken,
        { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async current(req, res, next) {
    try {
      res.status(200).json(req.user)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async logout(req, res, next) {
    try {
      const {} = req.body
      const { refreshToken } = req.cookies
      const token = userService.exit(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

}

module.exports = new UserController()