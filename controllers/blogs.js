const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        console.log(JSON.stringify(blogs, null, 2))
        res.json(blogs)
    } catch (error) {
        console.error('Error in getting blogs:', error);
        res.status(500).json({ error: 'Error in getting blogs' });
    }
})

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog.toJSON())
    } catch (error) {
        console.error('Error in posting:', error);
        return res.status(400).json({
            error
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        console.log(`Blog to be deleted ${req.params.id}.`)
        await Blog.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(204).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
})

module.exports = router

