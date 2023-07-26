const { Blog } = require('../models')

const findBlog = async (req, res, next) => {
    try {
        req.blog = await Blog.findByPk(req.params.id)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = findBlog