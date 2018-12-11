// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],

    files: [
      'src/**/test/*.js'
    ],
    port: 9876,
    colors: true,
    browsers: ['ChromeHeadless'],
    preprocessors: {
      // add webpack as preprocessor
      './src/index.js': [ 'webpack' ],
      './src/**/test/*.js': ['babel']
    },
    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    }
  });
};