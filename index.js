require('dotenv').config()
const integreat = require('integreat')
const couchdb = require('integreat-source-couchdb')
const queue = require('integreat-queue-redis')()
const debug = require('debug')('great')

// Remove any scheduled jobs
// queue.flushScheduled()

// Prepare defs
const defs = require('./config')
const {bindToQueue} = queue
const resources = couchdb(Object.assign({
  bindToQueue
}, integreat.resources()))

// Create new Integreat instance
const great = integreat(defs, resources)
debug('Integreat v' + great.version)

// Return instance
module.exports = great
