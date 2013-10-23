define([
  'backbone'
  ], function(Backbone) {

    var LandModel = Backbone.Model.extend({

      urlRoot: '/json/land-response.json?'

    });

    return LandModel;
  }
);