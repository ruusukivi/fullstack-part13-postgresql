const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        console.log(JSON.stringify(blogs, null, 2))
        res.json(blogs)
    } catch (error) {
        console.error('Error in getting blogs:', error);
        return res.status(500).json({ error: 'Error in getting blogs' });
    }
})

router.post('/', async (req, res) => {
    try {
        console.log(`Posting a blog ${req.body}`)
        const blog = await Blog.create(req.body)
        return res.json(blog.toJSON())
    } catch (error) {
        console.error('Error in posting:', error);
        return res.status(500).json({ error: 'Error in posting a blog' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        console.log(`Liking blog ${req.params.id}`)
        const blog = await Blog.findByPk(req.params.id);
        await blog.increment('likes', { by: 1 });
        return res.json(blog.toJSON());
    } catch (error) {
        console.error('Error in updating likes:', error);
        return res.status(500).json({ error: 'Error in updating likes' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        console.log(`Blog to be deleted - id:  ${req.params.id}.`)
        await Blog.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(204).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error in deleting the blog:', error);
        return res.status(500).json({ error: 'Error in deleting the blog' });
    }
})

module.exports = router

