const env = process.env.NODE_ENV;
const production = require('./production.config');
const development = require('./development.config');

const APP_CONFIGS = {
    SECRETS_KEY: {
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
    }
}


if (env !== 'PRODUCTION') {
    module.exports = Object.assign({}, APP_CONFIGS, development);
} else {
    module.exports = Object.assign({}, APP_CONFIGS, production);
}