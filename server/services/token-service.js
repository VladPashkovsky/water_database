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

    // const tokenData = await tokenModel.findOne({ user: userId })
    // if (tokenData) {
    //   tokenData.refreshToken = refreshToken
    //   return tokenData.save()
    // }

    const tokenData = await prisma.token.findUnique({
      where: { refreshToken: refreshToken }
    })

    if (tokenData) {
      await prisma.token.delete({
        where: { refreshToken },
      })
    }

    const token = await prisma.token.create({
      data: { refreshToken, userId },
    })
    return token
  }

//=====================================================================================================

  async updateToken(userId ,refreshToken) {
    // const tokenData = await prisma.token.findUnique({
    //   where: { refreshToken },
    // })
    //
    // if (tokenData) {
    //   await prisma.token.delete({
    //     data: { refreshToken },
    //   })
    // }
    // const updateUser = await prisma.user.update({
    //   where: {
    //     email: 'viola@prisma.io',
    //   },
    //   data: {
    //     name: 'Viola the Magnificent',
    //   },
    // })

    const tokenData = await prisma.token.update({
      where: {userId}, data: {refreshToken}
    })
    return tokenData
  }

//====================================================================================================
  async removeToken(refreshToken) {

    const tokenData = await prisma.token.delete({
      where: { refreshToken },
    })

    return tokenData
  }

//=====================================================================================================
  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken })
    return tokenData
  }
}

module.exports = new TokenService()