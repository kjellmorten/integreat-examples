module.exports = {
  sources: [
    require('./sources/nytimes'),
    require('./sources/store')
  ],
  datatypes: [
    require('./types/account'),
    require('./types/article'),
    require('./types/meta')
  ],
  auths: [
    require('./auths/couchdb')
  ]
}
