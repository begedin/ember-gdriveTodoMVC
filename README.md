ember-gdriveTodoMVC
===================

A TodoMVC demo for ember-gdrive

# The Goal

Create and document the creation of a ToDo list application which is able to 

* store tasks through ember-gdrive
* share the document via the ember-gdrive built-in share modal

# Preparing an EmberCLI app to use ember-gdrive

## Step 1 - Create a new Ember CLI applicaton
http://www.ember-cli.com/#getting-started
* `ember new my-test-app`

## Step 2 - Add required dependencies to the project
* `npm install --save-dev coderly/ember-gdrive`
* `npm install --save-dev ember-cli-simple-auth`
* `bower install --save ember-simple-auth`

Note that ember-cli-simple-auth is a third party addon which expects ember-simple-auth to be installed via bower. This is why ember-simple-auth needs to be added via bower.

## Step 3 - Prepare the Google Drive realtime API

Go to console.developers.google.com and create a new project (or use the exisitng one if it's already prepared). Open the project and go to **APIs and auth > Credentials**. Create a new Client ID and a new Public API Access Key. You will to use some of the keys here for your application.

## Step 4 - Modify your app's configuration and add ember-gdrive settings
`ember-gdrive` requires the following object to be added to the EmberCLI configuration's `ENV.APP` object:
```
'ember-gdrive': {
  GOOGLE_API_KEY: '[YOUR API KEY GOES HERE]',
  GOOGLE_MIME_TYPE: '[application/{something}]',
  GOOGLE_DRIVE_SDK_APP_ID: '[first part of your client id, the part before the first dash]',
  GOOGLE_CLIENT_ID: '[your entire client id]'
}
```

If you're using ember-cli-content-security-policy, this is the minimum you need to add to the `ENV` object in order to get rid of content security warnings during development.
Keep in mind that setting the header to the value bellow will cause the app to throw erros instead of warnings for any URL unaccounted for in the policy.
```
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
```

We suggest you read up on this at https://github.com/rwjblue/ember-cli-content-security-policy


# A simple TodoMVC with ember-gdrive

//Todo (no pun intended)