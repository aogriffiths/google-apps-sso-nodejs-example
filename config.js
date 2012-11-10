var config = {};

config.defs = {
  localhost: {
    name:  'localhost',
    domain:'tendogs.net',
    realm: 'http://localhost:5000'
  },
  production_tendogs: {
    name:  'production_tendogs',
    domain:'tendogs.net',
    realm: 'http://still-springs-4775.herokuapp.com/'
  },
  production_newsint: {
    name:  'production_newsint',
    domain:'newsint.co.uk',
    realm: 'http://still-springs-4775.herokuapp.com/'
  }
};

module.exports = config;