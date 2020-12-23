import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_, res) => res.json({ msg: 'Bookings Africa is running...' }))
require('../todo/routes')(app)
require('../users/routes')(app)
require('../auth/routes')(app)

module.exports = app
