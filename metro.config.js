const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  projectRoot: __dirname,
  watchman: {
    // Ignore Android build directories to prevent file watcher errors
  },
  resolver: {
    blacklistRE: /android\/app\/\.cxx|android\/\.gradle|node_modules\/.*\.xcodeproj/,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
