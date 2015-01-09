import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    create: function () {
      this.store.beginOperation('create task');
      var task = this.store.createRecord('task', {
        title: 'New task'
      });
      task.save();
      this.store.endOperation('create task');
    }
  }
  
});