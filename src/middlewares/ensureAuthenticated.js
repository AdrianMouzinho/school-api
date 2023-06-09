const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function ensureAuthenticated (req, res, next) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      errors: ['Você precisa fazer login.']
    })
  }

  try {
    const [, token] = authorization.split(' ')

    const { user } = jwt.verify(token, process.env.JWT_SECRET)

    const newUser = await User.findOne({
      where: {
        id: user.id,
        email: user.email
      }
    })

    if (!newUser) {
      return res.status(401).json({
        errors: ['Usuário inválido.']
      })
    }

    req.user = user

    return next()
  } catch (error) {
    return res.status(401).json({
      errors: ['Token inválido ou expirado.']
    })
  }
}

module.exports = ensureAuthenticated
