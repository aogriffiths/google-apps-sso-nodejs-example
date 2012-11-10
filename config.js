var config = {};

config.defs = {
  localhost: {
    name:  'localhost',
    domain:'<your_google_apps_domain>',
    realm: 'http://localhost:5000'
  },
  production: {
    name:  'production',
    domain:'<your_production_heroku_app>.herokuapp.com',
    realm: 'http://<your_production_heroku_app>.herokuapp.com'
  }
};

module.exports = config;