module.exports = {
  id: 'couchdb',
  strategy: 'couchdb',
  options: {
    uri: process.env.GR8_COUCHDB_URL,
    key: process.env.GR8_COUCHDB_KEY,
    secret: process.env.GR8_COUCHDB_PASSWORD
  }
}
