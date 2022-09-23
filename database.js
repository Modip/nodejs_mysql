const mysql = require('mysql')



const connect = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'library_nodejs'
})


module.exports = { connect };