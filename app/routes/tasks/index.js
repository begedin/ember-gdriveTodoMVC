import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('task');
  },
  
  renderTemplate: function(controller) {
    this.render('tasks/index', {controller: controller});
  }
});