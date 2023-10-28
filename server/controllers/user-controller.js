const { prisma } = require('../prisma/prisma-client')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {

  async register(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array()))
      }

      const {name, email, password} = req.body

      const registeredUserByName = await prisma.user.findFirst({
        where: { name },
      })
      const registeredUserByEmail = await prisma.user.findFirst({
        where: { email },
      })

      //  if (registeredUserByName) {
      //   throw ApiError.RegisterWrongName()
      // }
      //  if (registeredUserByEmail) {
      //   throw ApiError.RegisterWrongEmail()
      // }

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Input required fields, please' })
      } else if (registeredUserByName) {
        return res.status(400).json({ message: 'User with this name already exists' })
      } else if (registeredUserByEmail) {
        return res.status(400).json({ message: 'User with this email already exists' })
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      })

      const secret = process.env.JWT_SECRET

      if (user && secret) {
        res.status(201).json({
          id: user.id,
          email: user.email,
          name,
          token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
        })
      } else {
        return res(ApiError.BadRequest('Bad Request...', errors.array()))
      }
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body

      if (!email || !password) {
        return res.status(400).json({ message: 'Input required fields, please' })
      }

      const user = await prisma.user.findFirst({
        where: { email },
      })

      const isPasswordCorrect = user && (await bcrypt.compare(password, user.password))
      const secret = process.env.JWT_SECRET

      if (user && isPasswordCorrect && secret) {
        return res.status(200).json({
          id: user.id,
          email: user.email,
          name: user.name,
          token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
        })
      } else if (!user) {
        return res.status(500).json({ message: 'Wrong email' })
      } else if (!isPasswordCorrect) {
        return res.status(500).json({ message: 'Wrong password' })
      } else {
        return res.status(500).json({ message: 'Wrong login or password' })
      }
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

}

module.exports = new UserController()