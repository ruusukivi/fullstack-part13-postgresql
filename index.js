require('dotenv').config()
const {Sequelize, Model, DataTypes} = require('sequelize')

const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

class Blog extends Model {}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
    },
    uri: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
})

Blog.sync()

app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        console.log(JSON.stringify(blogs, null, 2))
        res.json(blogs)
    } catch (error) {
        console.error('Error in getting blogs:', error);
        res.status(500).json({ error: 'Error in getting blogs' });
    }
})

app.post('/api/blogs', async (req, res) => {
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

app.delete('/api/blogs/:id', async (req, res) => {
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


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})