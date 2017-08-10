require('dotenv').config()
const http = require('http')
const integreat = require('integreat')
const redisQueue = require('integreat-queue-redis')
const port = process.env.PORT

const queue = redisQueue({kue: {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    auth: process.env.REDIS_PASSWORD,
    options: {
      no_ready_check: true
    }
  }
}})

const defs = require('./defs')
const resources = Object.assign({
  queue
}, integreat.resources())

const great = integreat(defs, resources)
console.log('Integreat v' + great.version)

const schedules = [{
  schedule: {m: [0, 15, 30, 45]},
  job: {worker: 'sync', params: {from: 'nytimes', to: 'store', type: 'article'}}
}]

const server = http.createServer()

server.listen(port, (err) => {
  if (err) {
    return console.log('Server didn\'t start.', err)
  }

  console.log('Server started on port', port)

  great.schedule(schedules)
  .then((ret) => {
    console.log('Queue:', ret[0])
  })
})

server.on('exit', () => {
  great.detachQueue()

  console.log('Server closed')
})
