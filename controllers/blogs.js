const router = require('express').Router()
const {
    Blog,
    User
} = require('../models')
const {
    Op
} = require("sequelize");
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}


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
            where
        })
        res.json(blogs)
    } catch (error) {
        next(error)
    }
})

const userFinder = async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({
                error: 'Token invalid!'
            })
        }
        req.user = await User.findByPk(decodedToken.id)
        next()
    } catch (error) {
        next(error)
    }
}

router.post('/', userFinder, async (req, res, next) => {
    try {
        if (!req.body.uri || !req.body.title) {
            throw Error('Posting a blog failed!')
        }
        if (!req.user) {
            throw Error('No user found!')
        }
        const user = await User.findOne()
        const blog = await Blog.create({
            ...req.body,
            userId: req.user.id
        })
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

router.delete('/:id', blogFinder, userFinder, async (req, res, next) => {
    try {
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
    if (error.message === 'No user found!') {
        return res.status(404).json({
            error: `${error.message} Please log in to post.!`
        });
    }

    if (error.message === 'Only author can delete!') {
        return res.status(404).json({
            error: `${error.message}.`
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
    } else {
        console.log(error.message)
        return res.status(500).json({
            error: 'Something went wrong. Please try again!'
        });
    }
});

module.exports = router