module.exports = {
  id: 'couchdb',
  strategy: 'couchdb',
  options: {
    uri: process.env.CLOUDANT_URL,
    key: process.env.CLOUDANT_KEY,
    secret: process.env.CLOUDANT_PASSWORD
  }
}
