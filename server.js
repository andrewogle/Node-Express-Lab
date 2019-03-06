
const express = require('express')
const routes = require('./data/router')
const server = express()

server.use(express.json())
server.use('/api/posts', routes)

server.get('/', (req, res) => {
    res.send('hello world from express js')
});

module.exports = server;