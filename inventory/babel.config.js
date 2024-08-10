module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
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
  ],
};
