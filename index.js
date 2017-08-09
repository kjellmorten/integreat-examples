require('dotenv').config()
const integreat = require('integreat')
const queue = require('integreat-queue-redis')()
const debug = require('debug')('great')

const defs = require('./defs')
const resources = Object.assign({
  queue
}, integreat.resources())

const great = integreat(defs, resources)
debug('Integreat v' + great.version)

module.exports = great
