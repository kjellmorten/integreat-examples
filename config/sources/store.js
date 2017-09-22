module.exports = {
  id: 'store',
  adapter: 'couchdb',
  auth: 'couchdb',
  baseUri: `${process.env.GR8_COUCHDB_URL}/${process.env.GR8_COUCHDB_DB}`,
  endpoints: {
    get: {uri: '/_all_docs', path: 'rows[]'},
    getOne: '/{type}:{id}',
    set: {uri: '/_bulk_docs', path: 'docs[]', method: 'POST'},
    setOne: '/{type}:{id}',
    getMeta: '/{type}:{id}',
    setMeta: '/{type}:{id}'
  },
  mappings: {
    '*': {
      transform: ['removeTypePrefixOnId']
    }
  }
}
