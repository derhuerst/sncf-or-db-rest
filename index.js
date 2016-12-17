'use strict'

const http = require('http')

const api = require('./api')
const server = http.createServer(api)

server.listen(8080, (err) => {
	if (err) return console.error(err)
	console.log(`Listening on 8080.`)
})
