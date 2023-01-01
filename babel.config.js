module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          // This needs to be mirrored in tsconfig.json
          store: './src/store',
          utils: './src/utils',
          components: './src/components',
          hooks: './src/hooks',
          assets: './src/assets',
          styles: './src/styles',
          navigation: './src/navigation',
          screens: './src/screens',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
