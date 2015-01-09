import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function (transition) {

    this._super(transition);

    var route = this;
    var documentSource = route.get('documentSource');
    var state = documentSource.get('state'); // Forces creation of the state, which clears the query params
    var isStatePresent = state.get('isOpen') || state.get('isCreate');

    if (!isStatePresent) {
      return;
    }

    this.get('session').authenticate('authenticator:gdrive', {}).then(function () {

      if (state.get('isOpen')) {
        return documentSource.openFromState();
      } else {
        return documentSource.createFromState();
      }
    }).then(function (doc) {
      if (doc) {
        route.transitionTo('document', doc);
      }
    });
  },

  actions: {
    login: function () {
      this.session.authenticate('authenticator:gdrive', {});
    }
  }
});