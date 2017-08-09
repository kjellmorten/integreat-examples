module.exports = {
  id: 'store',
  adapter: 'couchdb',
  auth: 'couchdb',
  baseUri: `${process.env.CLOUDANT_URL}/${process.env.CLOUDANT_DB}`,
  endpoints: {
    get: {uri: '/_all_docs', path: 'rows'},
    getone: '/{type}:{id}',
    setone: '/{type}:{id}'
  },
  mappings: {
    '*': {}
  }
}
