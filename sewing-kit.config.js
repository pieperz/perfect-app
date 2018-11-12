const dotenv = require('dotenv');

dotenv.config();

const path = require('path');
const {ip, port, cdnUrl} = require('./config/server');

const tests = path.join(__dirname, 'tests');

module.exports = function sewingKitConfig(plugins, env) {
  return {
    name: 'your-app-name',
    plugins: [
      plugins.devServer({
        ip,
        port,
      }),
      plugins.cdn(cdnUrl),
      plugins.vendors([
        'react',
        'react-dom',
        'react-router',
        'react-router-dom',
        '@shopify/javascript-utilities',
        '@shopify/polaris',
        '@shopify/react-compose',
        '@shopify/react-utilities',
      ]),
      plugins.jest((config) => {
        config.setupFiles.push(path.join(tests, 'setup.ts'));
        config.setupTestFrameworkScriptFile = path.join(tests, 'each-test.ts');
        config.globals = config.globals || {};
        config.globals['ts-jest'] = config.globals['ts-jest'] || {};
        config.globals['ts-jest'].diagnostics = false;
        return config;
      }),
    ],
  };
};
