const http = require('http')
const app = require('./app')
const server = http.createServer(app)

///////
// const express = require('express')
// const app2 = express()
// const path = require('path')
// app2.use(express.static(path.join(__dirname, 'build')))
// app2.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', index.html))
// })
// app2.listen(5000)

///

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
