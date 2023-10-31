const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const ApiError = require('../exceptions/api-errors')
const jwt = require('jsonwebtoken')
const tokenService = require('./token-service')
const UserDto = require('../dto/user-dto')

class UserService {

  async signUp(name, email, password) {

    const registeredUserByName = await prisma.user.findFirst({
      where: { name },
    })
    const registeredUserByEmail = await prisma.user.findFirst({
      where: { email },
    })

    if (registeredUserByName) {
      throw ApiError.RegisterWrongName()
    }
    if (registeredUserByEmail) {
      throw ApiError.RegisterWrongEmail()
    }

    const hashedPassword = await bcrypt.hash(password, 3)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  //==============================================================================================

  async signIn(email, password) {

    const user = await prisma.user.findFirst({
      where: { email },
    })

    if (!user) {
      throw ApiError.LoginWrongEmail()
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.LoginWrongPassword()
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }
}

module.exports = new UserService()