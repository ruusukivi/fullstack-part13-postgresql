const router = require('express').Router()
const { List } = require('../models')
const userFinder = require('../utils/findUser')

router.post('/', userFinder, async (req, res, next) => {
    try {
        if (!req.user) {
            throw Error('No user found!')
        }
        if(!(req.user.id == req.body.userId)){
            throw Error('You can only update your own reading list!')
        }
        const list = await List.create(req.body)
        res.json(list)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', userFinder, async (req, res, next) => {
    try {
        if (!req.user) {
            throw Error('No user found!')
        }
        const { read } = req.body
        const id = req.params.id
        const list = await List.findByPk(id)
        const currentId = req.user.id
        const listUserId = list.toJSON().userId
        if (!(currentId === listUserId)) {
            throw Error('You can only update your own reading list!')
        }
        const updated = await List.update({ read: read }, {
            where: {
                id: id
            }
        })
        const updatedList = await List.findByPk(id)
        res.json(updatedList)
    } catch (error) {
        next(error)
    }
})

router.use((error, req, res, next) => {
    console.error(error.message)
    if (error.message === 'You can only update your own reading list!') {
        return res.status(401).json({
            error: error.message
        });
    } 
    if (error.message === 'No user found!') { 
        return res.status(401).json({
            error: `${error.message} Please log in to update list!`
        });
    } else {
        console.log(error.message)
        return res.status(500).json({
            error: 'Something went wrong. Please try again!'
        });
    }
})

module.exports = router