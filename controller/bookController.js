const db = require('../models/book_model.js')

sequelize = db.sequelize

const Book = db.books



const addBook = async (req, res) => {
    let bookData= {
        tiltle: req.body.tiltle,
        tagline: req.body.tagline,
        description: req.body.description
    }

    const book = await Book.create(bookData)
    res.status(200).send(book)
}

const getAllBooks = async (req, res) => {
    let books = await Book.findAll()
    res.status(200).send(books)
}

const getOneBook = async (req, res) => {
    let id = req.params.id
    let books = await Book.findOne({ where: {id: id}})
    res.status(200).send(books)
}

const updateBook = async (req, res) => {
    let id = req.params.id
    const book = await Book.update(req.body, {where: { id: id}})
    res.status(200).send(book)
}

module.exports = {
    addBook,
    getAllBooks,
    getOneBook,
    updateBook
}