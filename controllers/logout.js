const router = require('express').Router()
const { Session } = require('../models')
const userFinder = require('../utils/findUser')

router.delete('/', userFinder, async (req, res, next) => {
  try {
    if (!req.user) {
      throw Error('No user found!')
    }
    const id = req.user.id
    await Session.destroy({ where: { userId: id } })
    return res.status(200).json({ message: 'Successfully logged out!' })

  } catch (error) {
    next(error)
  }
})

router.use((error, req, res, next) => {
  console.error(error.message)
  if (error.message === 'No session found!') {
      return res.status(404).json({
          error: error.message
      })
  } 
  if (error.message === 'invalid signature') {
    return res.status(400).json({
        error: 'Session or token not valid! You are not logged in!'
    });
  } else {
      console.log(error.message)
      return res.status(500).json({
          error: 'Something went wrong. Please try again!'
      })
  }
})
 
module.exports = router
