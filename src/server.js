const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { resolve } = require('path')
require('dotenv/config')

const { routes } = require('./routes.js')
require('./database/index.js')

const port = process.env.APP_PORT

const whiteList = [
  process.env.FRONTEND_URL,
  'http://localhost:5173'
]

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const app = express()

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(express.static(resolve(__dirname, '..', 'uploads')))
app.use(routes)

app.listen(port, () => {
  console.log('HTTP server running!')
})
