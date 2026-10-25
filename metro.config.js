const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const config = getDefaultConfig(__dirname);
const NATIVE_ONLY = new Set(['react-native-google-mobile-ads', '@react-native-ml-kit/text-recognition', 'rn-mlkit-object-detection']);
const base = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && NATIVE_ONLY.has(moduleName)) return { type: 'sourceFile', filePath: path.join(__dirname, 'stub-native.js') };
  return base ? base(context, moduleName, platform) : context.resolveRequest(context, moduleName, platform);
};
module.exports = config;
