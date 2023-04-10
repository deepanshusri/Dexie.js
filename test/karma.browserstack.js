module.exports = {
  browserStack: {
    username: System.getenv("LT_USERNAME") == null ? "Your LT Username" : System.getenv("LT_USERNAME"),
    accessKey:System.getenv("LT_ACCESS_KEY") == null ? "Your LT AccessKey" : System.getenv("LT_ACCESS_KEY"),
      
    timeout: 1800
  },

   customLaunchers: {
        'Windows_Chrome': {
              base: 'WebDriver',
              config: webdriverConfig,
              browserName: 'chrome',
              version: 'latest',
              build: 'OSS',
              name: 'Jos MathJs',
              video: true, // capture video for your test
              visual: true, // capture screenshots on each step
              network: true, // capture network logs for your test
              console: true, // capture browser console logs
              terminal: true,
              user: process.env.LT_USERNAME,
              accessKey: process.env.LT_ACCESS_KEY,
              pseudoActivityInterval: 15000 // 5000 ms heartbeat
          }
      },
  }
}
