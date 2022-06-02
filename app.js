require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const recipesRouter = require(('./routes/recipes'), (app, fs))
app.use('/recipes', recipesRouter)
app.use('/recipes/details/:id', recipesRouter)

app.listen(3000, () => console.log('Server started'))