import Ember from 'ember';

export default Ember.ArrayController.extend({

  newTaskTitle: null,

  count: Ember.computed.alias('model.length'),

  remainingTasks: Ember.computed.filterBy('model', 'completed', false),
  remainingCount: Ember.computed.alias('remainingTasks.length'),

  completedTasks: Ember.computed.filterBy('model', 'completed', true),
  completedCount: Ember.computed.alias('completedTasks.length'),

  allAreDone: function (key, value) {
    if (value === undefined) {
      return this.get('length') > 0 && this.everyProperty('completed', true);
    } else {
      this.setEach('completed', value);
      this.invoke('save');
      return value;
    }
  }.property('@each.completed'),

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

    clearCompleted: function () {
      this.get('completedTasks').invoke('destroyRecord');
    }
  }

});
