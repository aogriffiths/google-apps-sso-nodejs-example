var config = {};

config.defs = {
  localhost: {
    name:  'localhost',
    domain:'tendogs.net',
    realm: 'http://localhost:5000'
  },
  production: {
    name:  'production',
    domain:'tendogs.net',
    realm: 'http://still-springs-4775.herokuapp.com/'
  }
};

module.exports = config;