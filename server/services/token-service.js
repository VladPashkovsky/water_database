const { prisma } = require('../prisma/prisma-client')
const jwt = require('jsonwebtoken')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
      accessToken, refreshToken,
    }
  }

//=======================================================================================================
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

//=========================================================================================================
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

//========================================================================================================
  async saveToken(userId, refreshToken) {
    try {
      const tokenData = await prisma.token.upsert({
        where: { userId },
        update: { refreshToken },
        create: { refreshToken, userId },
      })
      return tokenData
    } catch (e) {
    }
  }

//=====================================================================================================

  async updateToken(userId, refreshToken) {
    // const tokenData = await prisma.token.findUnique({
    //   where: { refreshToken },
    // })
    try {
      await prisma.token.delete({
        where: { refreshToken },
      })

      // const token = await prisma.token.create({
      //   data: { refreshToken, userId }
      // })
      // return token
    } catch (e) {
    }

    // try {
    //   const tokenData = await prisma.token.update({
    //     where: {refreshToken},
    //     data: {refreshToken: 'some new'}
    //   })
    //   return tokenData
    // } catch (e) {
    //
    // }

  }

//====================================================================================================
  async removeToken(refreshToken) {
    try {
      const tokenData = await prisma.token.delete({
        where: { refreshToken },
      })
      return tokenData
    } catch (e) {
    }
  }

//=====================================================================================================
  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken })
    return tokenData
  }
}

module.exports = new TokenService()