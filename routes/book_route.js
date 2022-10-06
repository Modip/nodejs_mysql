const express = require("express");
const router = express.Router();

const booKController = require("../controller/bookController.js");

//with Sequelize
router.post('/addBook', booKController.addBook)
router.get('/allBooks', booKController.getAllBooks)
router.get('/:id', booKController.getOneBook)
router.put('/:id', booKController.updateBook)
router.delete('/:id', booKController.delateBook)


module.exports = router;