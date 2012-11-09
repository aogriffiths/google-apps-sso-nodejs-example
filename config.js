var config = {};

config.defs = {
  localhost: {
    name:  'localhost',
    domain:'tendogs.net',
    realm: 'http://localhost:5000'
  },
  productiontd: {
    name:  'productiontendogs',
    domain:'tendogs.net',
    realm: 'http://still-springs-4775.herokuapp.com/'
  },
  productionni: {
    name:  'productionnewsint',
    domain:'newsint.co.uk',
    realm: 'http://still-springs-4775.herokuapp.com/'
  }
};

module.exports = config;