import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-gdrive/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  redirect: function() {
    this.replaceWith('tasks');
  }
});
