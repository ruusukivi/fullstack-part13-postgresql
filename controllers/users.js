const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ where: {username: req.params.username}})
        if(user){
            const updated = await user.update({ name: req.body.name })
            res.json(updated)
        } else {
            return res.status(404).json({ error })
        }
    } catch(error) {
      return res.status(400).json({ error })
    }
  })

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router