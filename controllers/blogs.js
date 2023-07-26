const router = require('express').Router()
const { Blog, User } = require('../models')
const { Op } = require("sequelize");
const userFinder = require('../utils/findUser');
const blogFinder = require('../utils/findBlog');

const currentYear = new Date().getFullYear();

router.get('/', async (req, res, next) => {
    try {
        let where = {}
        if (req.query.search) {
            where = {
                [Op.or]: [{
                        title: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        author: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    }
                ]
            }
        }
        const blogs = await Blog.findAll({
            attributes: {
                exclude: ['userId']
            },
            include: {
                model: User,
                attributes: ['name']
            },
            where,
            order: [
                ['likes', 'DESC'],
            ]
        })
        res.json(blogs)
    } catch (error) {
        next(error)
    }
})

router.post('/', userFinder, async (req, res, next) => {
    try {
        if (!req.user) {
            throw Error('No user found!')
        }
        if (!req.body.uri || !req.body.title) {
            throw Error('Posting a blog failed!')
        }
        if (!req.body.year || req.body.year < 1991 || req.body.year > currentYear ) {
            throw Error('The year should be at least 1991 and no greater than current year!')
        }
        const blog = await Blog.create({
            ...req.body,
            userId: req.user.id
        })
        return res.json(blog)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', blogFinder, async (req, res, next) => {
    try {
        if (!req.blog) {
            throw Error('Blog not found!')
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

router.delete('/:id', userFinder, blogFinder, async (req, res, next) => {
    try {
        if (!req.user) {
            throw Error('No user found!')
        }
        if (!req.blog) {
            throw Error('Blog not found!')
        }
        if (!(req.blog.userId == req.user.id)) {
            throw Error('Only author can delete!')
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
    throw Error('Endpoint not found!')
});

router.use((error, req, res, next) => {
    console.error(error.message)
    if (error.message === 'Endpoint not found!') {
        return res.status(404).json({
            error: error.message
        });
    }
    if (error.message === 'Blog not found!') {
        return res.status(404).json({
            error: `${error.message} Check the id!`
        });
    }
    if (error.message === 'Session not valid!') {
        return res.status(401).json({
            error: error.message
        });
    }
    if (error.message === 'No user found!') {
        return res.status(401).json({
            error: `${error.message} Please log in to post!`
        });
    }
    if (error.message === 'Only author can delete!') {
        return res.status(401).json({
            error: `${error.message}`
        });
    }
    if (error.message === 'User disabled!') {
        return res.status(401).json({
            error: error.message
        });
    }
    if (error.message === 'invalid signature') {
        return res.status(401).json({
            error: 'Session or token not valid! Log in again!'
        });
    }
    if (error.message === 'Amount of likes missing!') {
        return res.status(400).json({
            error: `${error.message}`
        });
    }
    if (error.message === 'Posting a blog failed') {
        return res.status(400).json({
            error: `${error.message} Title and url can´t be empty.`
        });
    }
    if (error.message === 'The year should be at least 1991 and no greater than current year!') {
        return res.status(400).json({
            error: error.message
        });
    } else {
        return res.status(500).json({
            error: 'Something went wrong. Please try again!'
        });
    }
});

module.exports = router