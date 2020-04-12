const server = require('./server')
const port = 9090;

server.listen(port, () => console.log(`Listening to port ${port}`))