import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    login: function() {
      this.session.authenticate('authenticator:gdrive');
    }
  }
});
