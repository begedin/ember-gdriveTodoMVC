import Ember from 'ember';

export default Ember.ObjectController.extend({
  completed: function(key, value){
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
  }.property('model.completed')
});