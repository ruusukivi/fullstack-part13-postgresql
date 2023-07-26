const { User } = require('../models')
const jwt = require('jsonwebtoken')
const validateSession = require('../utils/validateSession');

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null;
}

const findUser = async (req, res, next) => {
    try {
        const token = getTokenFrom(req)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        req.user = await User.findByPk(decodedToken.id)
        const id = req.user.id
        const validSession = await validateSession({id, token})
        if (!decodedToken.id || !validSession) {
            throw Error('Session not valid!')
        }
        if(req.user.disabled){
            throw Error('User disabled!')
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = findUser