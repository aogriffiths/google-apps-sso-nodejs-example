var config = {};

config.defs = {
  localhost: {
    name:  'localhost',
    domain:'tendogs.net',
    realm: 'http://localhost:5000'
  },
  production: {
    name:  'production tendogs',
    domain:'tendogs.net',
    realm: 'http://still-springs-4775.herokuapp.com/'
  }
  production: {
    name:  'production newsint',
    domain:'newsint.co.uk',
    realm: 'http://still-springs-4775.herokuapp.com/'
  }
};

module.exports = config;