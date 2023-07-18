const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({
        context: queryInterface
    }) => {
        await queryInterface.addColumn('blogs', 'year', {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: 1991,
                    msg: 'The year should be at least 1991',
                },
                max: {
                    args: new Date().getFullYear(),
                    msg: 'The year shouldn´t be greater than the current year',
                },
            },
        })
    },
    down: async ({
        context: queryInterface
    }) => {
        await queryInterface.removeColumn('blogs')
        await queryInterface.removeColumn('year')
    },
}