const router = require('express').Router()

const { Blog } = require('../models')


router.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.findAll()
        console.log(JSON.stringify(blogs, null, 2))
        res.json(blogs)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        if (!req.body.uri || !req.body.title) {
            throw Error('Posting a blog failed')
        }
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (error) {
        next(error)
    }
})

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.put('/:id', blogFinder, async (req, res, next) => {
    try {
        if (!req.blog) {
            throw Error('Blog not found')
        }
        if (!req.body.likes) {
            throw Error('Amount of likes missing!')
        }
        console.log(`Liking blog ${req.params.id}`)
        const blog = await Blog.findByPk(req.params.id);
        const updated = await blog.update({
            likes: req.body.likes
        })
        return res.json(updated);
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', blogFinder, async (req, res, next) => {
    try {
        if (!req.blog) {
            throw Error('Blog not found')
        }
        await Blog.destroy({
            where: {
                id: req.params.id
            }
        })
        const blogs = await Blog.findAll();
        res.status(200).json(blogs);
    } catch (error) {
        next(error)
    }
})

router.use('/', (req, res, next) => {
    throw Error('Endpoint not found')
});

router.use((error, req, res, next) => {
    console.error(error.message)
    if (error.message === 'Endpoint not found') {
        return res.status(404).json({
            error: error.message
        });
    }
    if (error.message === 'Blog not found') {
        return res.status(404).json({
            error: `${error.message}. Check the id!`
        });
    }
    if (error.message === 'Amount of likes missing!') {
        return res.status(400).json({
            error: `${error.message}`
        });
    }
    if (error.message === 'Posting a blog failed') {
        return res.status(400).json({
            error: `${error.message}. Title and url can´t be empty.`
        });
    } else {
        console.log(error.message)
        return res.status(500).json({
            error: 'Something went wrong. Please try again!'
        });
    }
});

module.exports = router