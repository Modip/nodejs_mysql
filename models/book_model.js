const { Sequelize } = require("sequelize")
const { sequelize } = require("../database")

    const Book = sequelize.define("Book", {
        title: {
            type: Sequelize.STRING,
        },
        tagline: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        }
    })

sequelize.sync()

module.exports = Book