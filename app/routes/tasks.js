import Ember from 'ember';

export default Ember.Route.extend({
  title: 'Tasks',

  model: function() {
    return this.store.find('task');
  }
});