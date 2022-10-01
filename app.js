const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/book_route');
const app = express()

const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())
app.use(require('./routes/book_route'))

app.use('/api/books', router)



app.listen(port, ()=> console.log(`Listen on port ${port}`))