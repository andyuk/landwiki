require.config({
  baseUrl: "js/",
  paths: {
    backbone: '/components/backbone/backbone-min',
    underscore: '/components/underscore/underscore-min'
  },
  shim: {
    'backbone': {
        //These script dependencies should be loaded before loading
        //backbone.js
        deps: ['underscore', 'jquery'],
        //Once loaded, use the global 'Backbone' as the
        //module value.
        exports: 'Backbone'
    },
    'underscore': {
        exports: '_'
    }
  }

});

require(["jquery", "views/map"], function($, MapView, MapSearchView) {
  $(function() {

      var mapView = new MapView({ el: $('#map') });
      mapView.bindEvents();

      // var mapSearchView = new MapSearchView({ el: $('') });
      // mapView.bindEvents();

  });
});