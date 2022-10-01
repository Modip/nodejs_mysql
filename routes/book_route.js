const { Router } = require("express");
const app = require("../app");
const router = Router();

const { connect} = require('../database')

const booKController = require("../controller/bookController.js");





router.get('/api/books', (req, res) => {

    connect.getConnection((err, connection) => {
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

//with Sequelize
router.post('/addBook', booKController.addBook)
router.get('/allBooks', booKController.getAllBooks)
router.get(':id', booKController.getOneBook)
router.put(':id', booKController.updateBook)




// Add books 

router.post('/api/books/create', (req, res) => {

    connect.getConnection((err, connection) => {
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
router.get('/api/books/:id', (req, res) => {

    connect.getConnection((err, connection) => {
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
router.put('/api/books/:id', (req, res) => {

    connect.getConnection((err, connection) => {
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
router.delete('/api/books/:id', (req, res) => {

    connect.getConnection((err, connection) => {
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

module.exports = router;