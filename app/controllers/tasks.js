import Ember from 'ember';

export default Ember.ArrayController.extend({
  newTaskTitle: null,

  actions: {
    create: function () {

      var title = this.get('newTaskTitle'),
        controller = this;

      if (title.length > 0) {
        var task = this.store.createRecord('task', {
          title: this.get('newTaskTitle')
        });
        task.save().then(function () {
          controller.set('newTaskTitle', '');
        });
      }
    },

    delete: function (task) {
      task.destroyRecord();
    }
  }

});