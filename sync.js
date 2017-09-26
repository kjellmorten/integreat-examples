require('dotenv').config()
const http = require('http')
const integreat = require('integreat')
const couchdb = require('integreat-source-couchdb')
const redisQueue = require('integreat-queue-redis')
const port = process.env.PORT

// Prepare queue
const queue = redisQueue({
  maxConcurrency: 10,
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    auth: process.env.REDIS_PASSWORD,
    options: {
      no_ready_check: true
    }
  }
})
const {bindToQueue} = queue

// Prepare defs
const defs = require('./config')
const resources = couchdb(Object.assign({bindToQueue}, integreat.resources()))
const schedules = [{
  schedule: {m: [0, 15, 30, 45]},
  job: {worker: 'sync', params: {from: 'nytimes', to: 'store', type: 'article', retrieve: 'updated'}}
}]

// Create new Integreat instance
const great = integreat(defs, resources)
console.log('Integreat v' + great.version)

// Logging
great
  .on('dispatch', (action) => {
    console.log('Dispatch: %s %o', action.type, action.payload)
  })
  .on('queued', (action, timestamp, result) => {
    const payload = (action.type === 'SET_ONE') ? action.payload.data.id : action.payload
    if (timestamp) {
      console.log('Queued #%s for %s: %s %o', result.data.id, new Date(timestamp), action.type, payload)
    } else {
      console.log('Queued #%s: %s %o', result.data.id, action.type, payload)
    }
  })

// Run server
const server = http.createServer()

server.listen(port, async (err) => {
  if (err) {
    return console.log('Server didn\'t start.', err)
  }

  console.log('Server started on port', port)

  // Remove any scheduled jobs from the queue
  await queue.flushScheduled()
  // Schedule jobs
  await great.schedule(schedules)
})

server.on('exit', () => {
  // Graceful takedown
  great.detachQueue()

  console.log('Server closed')
})
