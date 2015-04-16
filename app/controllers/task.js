import Ember from 'ember';

export default Ember.Controller.extend({

  isEditing: false,
  newTitle: Ember.computed.oneWay('model.title'),

  isCompleted: function(key, value){
    var model = this.get('model');

    if (value === undefined) {
      // property being used as a getter
      return model.get('completed');
    } else {
      // property being used as a setter
      model.set('completed', value);
      model.save();
      return value;
    }
  }.property('model.completed'),

  actions: {
    edit: function () {
      this.set('isEditing', true);
    },

    delete: function () {
      this.delete();
    },

    acceptChanges: function () {
      var newTitle = this.get('newTitle').trim();

      if (Ember.isEmpty(newTitle)) {
        Ember.run.debounce(this, 'delete', 0);
      } else {
        var task = this.get('model');
        task.set('title', newTitle);
        task.save();
      }

      this.set('newTitle', newTitle);
      this.set('isEditing', false);
    },

    discardChanges: function () {
      this.set('newTitle', this.get('title'));
      this.set('isEditing', false);
    }
  },

  delete: function () {
    return this.get('model').destroyRecord();
  }
});
