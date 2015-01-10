import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.filter('task', function(task){
      return !task.get('completed');
    });
  },
  
  renderTemplate: function(controller) {
    this.render('tasks/index', {controller: controller});
  }
});