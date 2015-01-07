import DS from 'ember-data';

var Task = DS.Model.extend({
  title: DS.attr('string', { defaultValue: 'New task' }),
  completed: DS.attr('boolean', { defaultValue: false })
});

export default Task;
