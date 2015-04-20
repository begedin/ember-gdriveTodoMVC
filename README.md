ember-gdriveTodoMVC
===================

A TodoMVC demo for ember-gdrive

# The Goal

Create and document the creation of a ToDo list application which is able to 

* store tasks through ember-gdrive
* share the document via the ember-gdrive built-in share modal

# How to run

* Clone the repository
* `ember install`
* This is an EmberCLI app, so run `ember serve` or `ember server` to run it.

# Preparing an EmberCLI app to use ember-gdrive

## Step 1 - Create a new Ember CLI applicaton
http://www.ember-cli.com/#getting-started
* `ember new my-test-app`

## Step 2 - Add ember-gdrive dependencies to the project
* `ember install:addon coderly/ember-gdrive`

This will install ember-gdrive as well as it's two prerequisites - `ember-simple-auth` as a bower component and `ember-cli-simple-auth` as an npm dependency.

## Step 3 - Prepare the Google Drive realtime API

Go to console.developers.google.com and create a new project (or use the exisitng one if it's already prepared). Open the project and go to **APIs and auth > Credentials**. Create a new Client ID and a new Public API Access Key. You will to use some of the keys here for your application.

Also go to **APIs and auth > API** and enable the **Drive API** and **Drive SDK**

Configure the SDK. Enable document creation and add your default MIME type. You will require it in the next section.

## Step 4 - Fill out google API information in `config/environment.js`

Installing the`ember-gdrive` addon will add a property group to the configuration script. This is where your Google API information is supposed to go. The properties are filled as follows:

```JavaScript
'ember-gdrive': {
  GOOGLE_API_KEY: '[your API key goes here]',
  GOOGLE_MIME_TYPE: '[your selected MIME type goes here]',
  GOOGLE_DRIVE_SDK_APP_ID: '[first part of your client id, the part before the first dash]',
  GOOGLE_CLIENT_ID: '[your entire client id]'
}
```

### (Optional) Issues with the content-security-policy feature?

If you're using ember-cli-content-security-policy, which installs by default with a new Ember-cli app, this is the minimum you need to add to the `ENV` object in order to get rid of content security warnings thrown during app runtime.

Keep in mind that this covers only rules needed by ember-gdrive to function correctly and without violations. Your application might need specific rules of it's own.

```JavaScript
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

# Basic application structure

Upon installation of `ember-gdrive`, some basic scaffolding will be added to your app, which includes a model, a route structure and a view which allows you add and remove simple items to and from a Google Drive document.

The scaffolding also allows you to create new documents via the `document-creator` component placed in the `application` template, as well as share a loaded document through the `share-modal` component placed in the `items` template.

## Routes and route mixins

The router configuration is structured in the following way:
```JavaScript
Router.map(function() {
  this.resource('document', { path: 'd/:document_id' }, function() {
      this.resource('items', { path: 'items' });
      
      // the rest of your models will go here, under the document resource
  });
  
  this.resource('login');
});

```
ember-gdrive exposes several route mixins, which need to be used in your application. They are mostly inherited from `ember-simple-auth`, with a few extensions.

* `ApplicationRouteMixin` - this one will is used by your `application` route. If you do not have an open document, you can login from here and create a new one.
* `AuthenticatedRouteMixin` - this one will be used by the `document` since this is the route that needs direct access to the Google Drive document and enables it's child routes to store to and retrieve record from the document. 

## Adapter 

ember-gdrive provides and sets an application adapter automatically, so there's no need to do anything in a typical case.

If you need to customize it, you can import and extend it yourself by creating `adapters/application.js`:

```JavaScript
import GoogleDriveAdapter from 'ember-gdrive/adapters/google-drive';

export default GoogleDriveAdapter.extend({});
```

## Authentication - The `LoginController`

ember-gdrive provides an authenticator based on [ember-simple-auth](https://github.com/simplabs/ember-simple-auth) and [ember-cli-simple-auth](https://github.com/simplabs/ember-cli-simple-auth). 

In the default scaffolding, when accessing an "authentication-required" route while unauthenticated, you will be redirected to the `login` route. The `LoginController` and it's template handle authentication.

## Creating documents - The `document-creator` component

A `document-creator` component exists within the add-on. It consists of an unstyled input field and button and requires the user to be logged in in order to create the document. 

In the scaffolding, the `application` template uses this component to handle document creation, but you need to be authenticated first. 

Document creation can take a few seconds. Once the document is created, a predefined action handler from the `ApplicationRouteMixin` will transition you to the `document` route with the newly created document loaded.

If you need to override this predefined action, simply bind the `document-creator` component to a different handler function, or, even simpler, override the handler function itself. As an easy reference, this is what the default handler looks like:

```JavaScript
actions: {
  documentCreated: function (doc) {
    this.transitionToDocument(doc);
  }
}

transitionToDocument: function (doc) {
  this.transitionTo('document', doc);
}
```

## Sharing

A `share-modal` component is added to the `document` template, together with a link bound to an action that sets the `isSharing` property to true in order to open the modal. The action the link is bound to has been placed into the `document` controller.

The component is a modal dialog with a list of google users with permissions to the current document. You can send an invitation to more users as well as revoke permissions from existing users by clicking on the X icon next to their name.

Clicking outside the modal will dimiss it.

As visible in the `document` controller, setting the "isSharing" property to true will open the modal. The property will immediately be set back to false, and the modal will handle any closing actions by itself.

The modal has a default set of styles, which should look acceptable, but if you'd like to addapt it to your own set, the easiest way to do that and completely abandon the old styles is to use the component with a custom tag name:
```Handlebars
{{share-modal tagName='my-custom-tag-name' open-when=isSharing}}
```
