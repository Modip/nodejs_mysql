const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())


const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'library_nodejs'
})

app.get('/books', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connection as ${connection.threadId}`)

        connection.query('SELECT * from books', (err, rows) => {

            connection.release() // rtn connection to pool

            if(!err){
                res.send(rows)
            }else {
                console.log(err)
            }

        })
    })

})

// Add books 
app.post('/books/create', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connection as ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT INTO books SET ?', params, (err, rows) => {

            connection.release() // rtn connection to pool

            if(!err){
                res.send(`Book with name: ${[params.name]} has been added`)
            }else {
                console.log(err)
            }

        })
    })

})

//get books by Id 
app.get('/books/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connection as ${connection.threadId}`)

        connection.query('SELECT * from books WHERE id = ?', (req.params.id) , (err, rows) => {

            connection.release() // rtn connection to pool

            if(!err){
                res.send(rows)
            }else {
                console.log(err)
            }

        })
    })

})


// Edit books by id
app.put('/books/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connection as ${connection.threadId}`)

        const params = req.body

        const { id, name, tagline, description, image} = req.body

        connection.query('UPDATE  books SET name = ?, tagline = ?, description = ?,  image = ? WHERE id = ?', [name,image, tagline, description, id], (err, rows) => {

            connection.release() // rtn connection to pool

            if(!err){
                res.send(`Book with name: ${[name]} has been updated`)
            }else {
                console.log(err)
            }

        })
    })

})

//Delete books by Id
app.delete('/books/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connection as ${connection.threadId}`)

        connection.query('DELETE from books WHERE id = ?', (req.params.id) , (err, rows) => {

            connection.release() // rtn connection to pool

            if(!err){
                res.send(`Book with ID: ${[req.params.id]} has been removed`)
            }else {
                console.log(err)
            }

        })
    })

})







app.listen(port, ()=> console.log(`Listen on port ${port}`))