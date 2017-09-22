require('dotenv').config()
const integreat = require('integreat')
const queue = require('integreat-queue-redis')()
const debug = require('debug')('great')

// Prepare defs
const defs = require('./config')
const resources = Object.assign({
  queue
}, integreat.resources())

// Create new Integreat instance
const great = integreat(defs, resources)
debug('Integreat v' + great.version)

// Return instance
module.exports = great
