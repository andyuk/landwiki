require.config({
  baseUrl: "js/",
  paths: {
    backbone: '/components/backbone/backbone-min',
    underscore: '/components/underscore/underscore-min',
    text: '/components/requirejs-text/text',
    hogan: '/components/hogan/web/builds/2.0.0/hogan-2.0.0.amd'
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
    },
    'hogan': {
        exports: 'Hogan'
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