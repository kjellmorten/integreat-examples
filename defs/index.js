module.exports = {
  sources: [
    require('./sources/nytimes'),
    require('./sources/store')
  ],
  datatypes: [
    require('./types/article')
  ],
  auths: [
    require('./auths/couchdb')
  ]
}
