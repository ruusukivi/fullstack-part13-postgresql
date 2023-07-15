const router = require('express').Router()

const {
  User, Blog
} = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)

    res.json(user)
  } catch (error) {
    if (error.message) {
      const message = error.message
      return res.status(400).json({
        message
      })
    }
    return res.status(400).json({
      error
    })
  }
})

router.put('/:username', async (req, res) => {
      try {
        const user = await User.findOne({
            where: {
              username: req.params.username,
            },
            include: {
              model: Blog
            }
          }) 
          if (user) {
            const updated = await user.update({
              name: req.body.name
            })
            const users = await User.findAll({
              include: {
                model: Blog
              }
            })
            res.json(updated)
          } else {
            return res.status(404).json({
              error
            })
          }
        }
        catch (error) {
          return res.status(400).json({
            error
          })
        }
      })

    router.get('/:id', async (req, res) => {
      const id =  req.params.id
      const user = await User.findByPk({
        id,
        include: {
          model: Blog
        }
      })
      if (user) {
        res.json(user)
      } else {
        res.status(404).end()
      }
    })

    module.exports = router