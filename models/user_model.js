const { Sequelize } = require("sequelize")
const { sequelize } = require("../database")

    const User = sequelize.define("user", {
        fullname: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    })

sequelize.sync()

module.exports = User