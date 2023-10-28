class UserController {

  async register(req, res, next) {
    try {
      return res.json({ message: 'Register response' })
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      return res.json({ message: 'Login response' })
    } catch (e) {
      next(e)
    }
  }

  async current(req, res, next) {
    try {
      return res.json({ message: 'Current' })
    } catch (e) {
      next(e)
    }
  }

}

module.exports = new UserController()