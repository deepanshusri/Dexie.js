var fs = require('fs');

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {

  // Lambdatest grid hostname and port
  var webdriverConfig = {
      hostname: 'hub.lambdatest.com',
      port: 80
  }

  function getSpecs(specList) {
    if (specList) {
      return specList.split(',')
    } else {
      return ['**/*.js'] // whatever your default glob is
    }
  }

  function parseTestPattern(argv) {
    var found = false;
    var pattern = argv.map(function(v) {
      if (found) {
        return v;
      }
      if (v === '--') {
        found = true;
      }
    }).
    filter(function(a) { return a }).
    join(' ');
    return pattern ? ['--grep', pattern] : [];
  }

  config.set({
      hostname: 'localhost', // hostname, where karma web server will run
      port: 9870,
      basePath: './',
      frameworks: ['jasmine'],
      plugins: [
          'karma-jasmine',
          'karma-webdriver-launcher',
          'karma-*',
          'karma-mocha-reporter'
      ],
      client: {
        args: parseTestPattern(process.argv)
      },

      preprocessors: {
      },
      files: ['src/*.js'].concat(getSpecs(process.env.KARMA_SPECS)),

      captureTimeout: 600000,
      retryLimit: 1,
      browserDisconnectTimeout: 90000,
      browserDisconnectTolerance: 1,
      browserNoActivityTimeout: 90000,
      reporters: ['mocha'],
      colors: true,
      concurrency: 1,
      logLevel: config.LOG_DEBUG,
      browsers: ['Chrome'],
      customLaunchers: {
        'Chrome': {
              base: 'WebDriver',
              config: webdriverConfig,
              browserName: 'chrome',
              platform: process.env.HYPEREXECUTE_PLATFORM,
              version: '95',
              build: 'Jasmine Unit Test Demo',
              name: 'Karma jasmine Sample',
              video: true, // capture video for your test
              visual: true, // capture screenshots on each step
              network: true, // capture network logs for your test
              console: true, // capture browser console logs
              user: process.env.LT_USERNAME,
              accessKey: process.env.LT_ACCESS_KEY,
              pseudoActivityInterval: 15000 // 5000 ms heartbeat
          }
      },
      singleRun: true,
      autoWatch: true
  });
};
