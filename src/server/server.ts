import http from 'http'

const app = require('./app')

const PORT = process.env.PORT || 5000
http.createServer(app).listen(PORT, () => console.log(`Server is up and running!!`))
