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

## Step 2 - Add ember-gdrive to the project
* `npm install --save-dev coderly/ember-gdrive`

## Step 3 - Prepare the Google Drive realtime API

Go to console.developers.google.com and create a new project (or use the exisitng one if it's already prepared). Open the project and go to **APIs and auth > Credentials**. Create a new Client ID and a new Public API Access Key. You will to use some of the keys here for your application.

## Step 4 - Modify your app's configuration and add ember-gdrive settings
`ember-gdrive` requires the following object to be added to the EmberCLI configuration's `ENV.APP` object:
```
'ember-gdrive': {
  GOOGLE_API_KEY: '[YOUR API KEY GOES HERE]',
  GOOGLE_MIME_TYPE: '[application/{something}]',
  GOOGLE_DRIVE_SDK_APP_ID: '[first part of your client id, the part before the first dash]',
}
```

# A simple TodoMVC with ember-gdrive

//Todo (no pun intended)