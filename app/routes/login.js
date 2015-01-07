import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    login: function(userID) {
      this.session.authenticate('authenticator:gdrive', {
        userID: userID
      });
    }
  }
});
