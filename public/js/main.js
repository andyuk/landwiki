/*global app: true */

require.config({
  baseUrl: "/js/",
  paths: {
    backbone: '/components/backbone/backbone-min',
    underscore: '/components/underscore/underscore-min',
    text: '/components/requirejs-text/text',
    hogan: '/components/hogan/web/builds/2.0.0/hogan-2.0.0.amd',
    epiceditor: '/components/EpicEditor/src/editor',
    marked: '/components/marked/lib/marked',
    tagsinput: '/components/jquery.tagsinput/jquery.tagsinput'
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
    },
    'epiceditor': {
        exports: 'EpicEditor'
    },
    'marked': {
        exports: 'marked'
    }
  }

});

define(
  "router",
  [
    "backbone",
    "models/land",
    "views/map",
    "views/land/form",
    "views/land/info"
  ], 
  function(Backbone, LandModel, MapView, LandFormView, LandInfoView) {
    var AppRouter = Backbone.Router.extend({

      routes: {
        "info/:id"      : "info",
        "edit/:id"      : "edit"
      },

      initialize: function() {
        this.currentView = null;
        this.$viewContainer = $('#currentView');

        console.log('init router');
        var mapView = new MapView({ el: $('#map') });
        mapView.bindEvents();
      },

      setView: function(view) {
        if (this.currentView)
          this.currentView.remove();
        this.currentView = view;
        this.$viewContainer.append(this.currentView.render().$el);
      },

      info: function(id) {
        var landModel = new LandModel({ id: id });
        landModel.fetch();

        var infoPanel = new LandInfoView({ model: landModel});
        this.setView(infoPanel);
      },

      edit: function(id) {
        var landModel = new LandModel({ id: id });
        landModel.fetch();

        var form = new LandFormView({ model: landModel});
        this.setView(form);
      }

    });
    return AppRouter;
});

require(["jquery", "router"], function($, AppRouter) {
  $(function() {
    window.app = new AppRouter();
    Backbone.history.start({pushState: true, root: "/preview/"});
  });
});