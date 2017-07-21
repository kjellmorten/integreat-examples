require('dotenv').config()
const integreat = require('integreat')
const queue = require('integreat-queue-redis')()
const debug = require('debug')('great')

const datatypes = [
  require('./defs/types/article')
]
const sources = [
  require('./defs/sources/nytimes'),
  require('./defs/sources/store')
]
const adapters = integreat.adapters()
const auths = integreat.authStrats()
const transformers = {}
const filters = {}
const formatters = integreat.formatters()
const workers = integreat.workers()

const great = integreat({
  sources,
  datatypes,
  adapters,
  auths,
  transformers,
  filters,
  formatters,
  workers,
  queue
})
debug('Integreat v' + great.version)

module.exports = great
