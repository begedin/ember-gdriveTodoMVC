/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-gdrive-todo-mvc',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    
    contentSecurityPolicyHeader: 'Content-Security-Policy',
    contentSecurityPolicy: {
      'default-src': "'self' accounts.google.com content.googleapis.com drive.google.com",
      'script-src': "'self' 'unsafe-eval' 'unsafe-inline' apis.google.com drive.google.com",
      'font-src': "'self'",
      'connect-src': "'self' 'unsafe-eval' apis.google.com drive.google.com",
      'img-src': "'self' data: ssl.gstatic.com csi.gstatic.com",
      'style-src': "'self' 'unsafe-inline'",
      'media-src': "'self'"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      'ember-gdrive': {
        GOOGLE_API_KEY: 'AIzaSyBQ8R2PRoiMnetrIhyFevjnqFmq84_Se2c',
        GOOGLE_MIME_TYPE: 'application/todomvc',
        GOOGLE_DRIVE_SDK_APP_ID: '872473528107',
        GOOGLE_CLIENT_ID: '872473528107-us5nehkt2ai460gskr325pnmbjm4u0tu.apps.googleusercontent.com'
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
