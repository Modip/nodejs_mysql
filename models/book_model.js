module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("book", {
        title: {
            type: DataTypes.STRING,
        },
        tagline: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }
    })

    return Book
}

