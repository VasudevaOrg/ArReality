const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add 3D model extensions so Metro Bundler can load them!
config.resolver.assetExts.push(
  'obj',
  'mtl',
  'glb',
  'gltf',
  'vrx'
);

module.exports = config;
