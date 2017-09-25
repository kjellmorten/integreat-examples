module.exports = {
  id: 'store',
  adapter: 'json',
  auth: 'couchdb',
  baseUri: `${process.env.GR8_COUCHDB_URL}/${process.env.GR8_COUCHDB_DB}`,
  handleMeta: true,
  endpoints: {
    get: {uri: '/_design/store/_view/by_type_updatedAt?include_docs=true&startkey=["{type}"{updatedAfter|wrap(\\,",")?}]&endkey=["{type}",\\{\\}]', path: 'rows[].doc'},
    getOne: '/{type}:{id}',
    set: {uri: '/_bulk_docs', path: 'docs[]', method: 'POST'},
    setOne: '/{type}:{id}',
    getRevs: {uri: '/_all_docs{?keys=ids|wrap([, ", ", ]),include_docs=includeDocs?}', path: 'rows[]'},
    getMeta: '/{type}:{id}',
    setMeta: '/{type}:{id}'
  },
  mappings: {
    '*': {
      transform: ['removeTypePrefixOnId']
    }
  },
  beforeSerialize: 'couchdb-beforeSerialize',
  afterNormalize: 'couchdb-afterNormalize'
}
