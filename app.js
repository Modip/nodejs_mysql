const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('./database');

const apiRoutes = require('./routes/book_route')

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

app.use('/api/books', apiRoutes)


app.listen(port, async () => { 
    console.log(`Listen on port ${port}`)
    await connect() })