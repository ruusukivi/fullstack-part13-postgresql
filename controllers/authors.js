const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../utils/db')

router.get('/', async (req, res, next) => {
    try {
        const authors = await Blog.findAll({
            attributes: [
              'author',
              [sequelize.fn('COUNT', sequelize.col('*')), 'articles'],
              [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
            ],
            group: 'author',
            order: [
              ['likes', 'DESC'],
            ],
          });
        res.json(authors)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: 'Something went wrong. Please try again!'
        })
    }
})

module.exports = router