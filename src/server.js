const express = require('express')
const { resolve } = require('path')
require('dotenv/config')

const { routes } = require('./routes.js')
require('./database/index.js')

const port = process.env.APP_PORT

const app = express()

app.use(express.json())
app.use(express.static(resolve(__dirname, '..', 'uploads')))
app.use(routes)

app.listen(port, () => {
  console.log('HTTP server running!')
})
