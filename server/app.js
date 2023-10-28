const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()

const PORT = process.env.PORT || 8000

const usersRouter = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/users', usersRouter)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
