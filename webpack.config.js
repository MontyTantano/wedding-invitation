const packageJson = require('./package.json');
const configClient = require('./webpack.config.client');
const configServer = require('./webpack.config.server');

const VERSION = (packageJson.version || '').replace(/\./g, '-');

module.exports = (env = {}, options = {}) => {
  const configType = env.configType || 'client';
  let getConfig;

  switch (configType) {
    case 'client':
      getConfig = configClient;
      break;
    case 'server':
      getConfig = configServer;
      break;
    default:
      break;
  }

  return (
    getConfig &&
    getConfig({
      mode: options.mode,
      port: env.port,
      projectVersion: VERSION
    })
  );
};
