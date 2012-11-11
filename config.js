var config = {};

config.defs = {
  localhost: {
    name:  'test_tendogs.net',
    domain:'tendogs.net',
    realm: 'http://localhost:5000'
  },
  production_tendogs: {
    name:  'production_tendogs.net',
    domain:'tendogs.net',
    realm: 'http://still-springs-4775.herokuapp.com/'
  },
  production_newsint: {
    name:  'production_newsint.co.uk',
    domain:'newsint.co.uk',
    realm: 'http://still-springs-4775.herokuapp.com/'
  }
};

module.exports = config;
