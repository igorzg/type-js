
module.exports = function (config) {


    config.set({
        // list of files / patterns to load in the browser
        frameworks: ['jasmine'],
        logLevel: config.LOG_INFO,
        files: [
            'type.js',
            'type-spec.js'
        ],
        customLaunchers: {
            'SL_Chrome': {
                base: 'SauceLabs',
                browserName: 'chrome'
            },
            'SL_Firefox': {
                base: 'SauceLabs',
                browserName: 'firefox'
            },
            'SL_Opera': {
                base: 'SauceLabs',
                browserName: 'opera'
            },
            'SL_Safari': {
                base: 'SauceLabs',
                browserName: 'safari',
                platform: 'OS X 10.9'
            },
            "SL_IE_10": {
                base: "SauceLabs",
                browserName: "Internet Explorer",
                platform: "Windows 8",
                version: "10"
            },
            "SL_IE_11": {
                base: "SauceLabs",
                browserName: "Internet explorer",
                platform: "Windows 8.1",
                version: "11"
            }
        },
        reporters: ['saucelabs'],
        browsers: [/*'Firefox',  'Opera', 'Safari', */ 'Chrome'],
        plugins: [
            'karma-*'
        ],
        browserNoActivityTimeout: 1000000
    });
};
