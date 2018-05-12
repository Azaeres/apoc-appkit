/* config-overrides.js */
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

const path = require('path');
const immer = require('immer');
const produce = immer.default;
const { setAutoFreeze } = immer;

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = rewireReactHotLoader(config, env);
  config = srcFolderForModules(config);
  return config;
}

function srcFolderForModules(config) {
  setAutoFreeze(false);
  const newConfig = produce(config, (draft) => {
    draft.resolve.modules.unshift(path.join(__dirname, 'src'));
    draft.resolve.modules.unshift(path.join(__dirname, 'src/app'));
  });
  setAutoFreeze(true);
  return newConfig;
}
