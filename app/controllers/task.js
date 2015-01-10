import Ember from 'ember';

export default Ember.ObjectController.extend({
  
  isEditing: false,
  
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
      this.get('model').destroyRecord();
    },

    acceptChanges: function () {
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('delete', task);
      } else {
        this.get('model').save();
      }
    },
  }
});
