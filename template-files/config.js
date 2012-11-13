var config = {};

config.defs = {
  localhost: {
    name:  'test_<your_google_apps_domain>',
    domain:'<your_google_apps_domain>',
    realm: 'http://localhost:5000'
  },
  production: {
    __default: true,
    name:  'production_<your_google_apps_domain>',
    domain:'<your_google_apps_domain>',
    realm: 'http://<your_production_heroku_app>.herokuapp.com'
  }
};

module.exports = config;