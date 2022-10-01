const connect = require('../database.js');
module.exports == exports

const {Sequilize, DataTypes} = require('sequilize');

const sequelize = new Sequilize(
    db.database,
    db.user,
    db.password,{
        host: db.host,
        dialect: db.dialect,
        operatorsAlliases: false
    }
    
)

sequelize.authenticate()
.then(()=> {
    console.log('connected...')
})
.catch(err => {
    console.log('Error'+ err)
})


const db = {}

db.Sequilize = Sequilize
db.sequelize = sequelize

db.books = require('./book_model.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false})
.then(()=> {
    console.log('yes re-sync done :)')
})

module.exports = db