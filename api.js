'use strict'

const express = require('express')
const corser = require('corser')
const compression = require('compression')
const nocache = require('nocache')

const sncfOrDB = require('db-sncf-prices/sncf-or-db')



const api = express()
module.exports = api

const allowed = corser.simpleRequestHeaders.concat(['User-Agent', 'X-Identifier'])
api.use(corser.create({requestHeaders: allowed})) // CORS

api.use(compression())
api.use(nocache())



api.get('/', (req, res, next) => {
	if (!req.query.query) next(new Error('Missing query.'))

	sncfOrDB(req.query.query)
	.then((result) => res.json({
		error: false, data: result
	}))
	.catch(next)
})



api.use((err, req, res, next) => {
	if (res.headersSent) return next()
	res.status(err.statusCode || 500).json({
		error: true, msg: err.message
	})
	next()
})
