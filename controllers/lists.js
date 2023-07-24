const router = require('express').Router()
const {
    List,
    User
} = require('../models')
const {
    sequelize
} = require('../utils/db')
const userFinder = require('../utils/userfinder')

router.post('/', async (req, res, next) => {
    try {
        const list = await List.create(req.body)
        res.json(list)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', userFinder, async (req, res, next) => {
    try {
        const { read } = req.body
        const id = req.params.id
        const list = await List.findByPk(id)
        const currentId = req.user.id
        const listUserId = list.toJSON().userId
        if (!(currentId === listUserId)) {
            throw Error('You can only update your own reading list!')
        }
        const updatedList = await List.update({ read: read }, {
            where: {
                id: id
            }
        })
        res.json(updatedList)
    } catch (error) {
        next(error)
    }
})

router.use((error, req, res, next) => {
    console.error(error.message)
    if (error.message === 'You can only update your own reading list!') {
        return res.status(403).json({
            error: error.message
        });
    } else {
        console.log(error.message)
        return res.status(500).json({
            error: 'Something went wrong. Please try again!'
        });
    }
})

module.exports = router