import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function(transition) {
    
    this._super(transition);
    
    var route = this;
    var documentSource = route.get('documentSource');
    var state = documentSource.get('state'); // Forces creation of the state, which clears the query params
    var isStatePresent = state.get('isOpen') || state.get('isCreate');

    if (!isStatePresent) {
      return;
    }
    
    var documentLoadPromise = null;
    
    if (state.get('isOpen')) {
      documentLoadPromise = documentSource.openFromState();
    } else {
      documentLoadPromise = documentSource.createFromState();
    }
    
    return documentLoadPromise.then(function(doc) {
      if(doc) {
        route.transitionTo('document', doc);
      }
    });
  }

});
