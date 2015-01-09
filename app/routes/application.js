import Ember from 'ember';
import ApplicationRouteMixin from 'ember-gdrive/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    logout: function () {
      var route = this,
        session = this.get('session');

      session.invalidate().then(function () {
        route.transitionTo('login');
      });
    }
  }
});
