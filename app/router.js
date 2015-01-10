import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('document', { path: 'd/:document_id' }, function() {
      this.resource('tasks', { path: 'tasks' }, function() {
        this.route('remaining');
        this.route('completed');
      });
  });
  
  this.resource('login');
});

export default Router;
