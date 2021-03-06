// Get an api key from http://developer.nytimes.com/signup

module.exports = {
  id: 'nytimes',
  adapter: 'json',
  baseUri: 'http://api.nytimes.com/svc/',
  handleMeta: 'store',
  endpoints: {
    get: {
      uri: `topstories/v2/technology.json?api-key=${process.env.NYTIMES_API_KEY}`,
      path: 'results[]'
    }
  },
  mappings: {
    article: {
      attributes: {
        id: 'url',
        title: {},
        abstract: {},
        createdAt: 'created_date',
        updatedAt: 'updated_date',
        url: {},
        byline: {}
      }
    }
  }
}
