require('dotenv').config()
const integreat = require('integreat')
const couchdb = require('integreat-source-couchdb')
const redis = require('integreat-queue-redis')()
const debug = require('debug')('great')

// Prepare
const defs = require('./defs')
const resources = couchdb(integreat.resources())
const queue = integreat.queue(redis)

// Create new Integreat instance
const great = integreat(defs, resources, [queue.enqueue])
queue.dequeue(great.dispatch)
debug('Integreat v' + great.version)

// Return instance
module.exports = great
