const { User } = require('../models')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

const userFinder = async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({
                error: 'Token invalid!'
            })
        }
        req.user = await User.findByPk(decodedToken.id)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = userFinder