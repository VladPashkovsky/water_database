const ApiError = require('../exceptions/api-errors')
const tokenService = require('../services/token-service')

module.exports = function(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return ApiError.UnauthorizedError()
    }
    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return ApiError.UnauthorizedError()
    }
    req.user = userData
    next()
  } catch (e) {
    return ApiError.UnauthorizedError()
  }
}