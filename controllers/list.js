const router = require('express').Router()
const { List } = require('../models')
const { sequelize } = require('../utils/db')

router.post('/', async (req, res, next) => {
    try {
        const list = await List.create(req.body)
        res.json(list)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: 'Something went wrong. Please try again!'
        })
    }
})

module.exports = router