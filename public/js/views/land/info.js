define([
  'backbone',
  'underscore',
  'hogan',
  'text!templates/land/info.html'
  ], 
  function(Backbone, _, Hogan, template) {

    var LandInfoView = Backbone.View.extend({

      className: 'lw-info-panel',
      element: 'div',

      events: {
        "click a[rel=edit-land]": "editLand"
      },

      initialize: function() {
        console.log('LandInfoView init');
        this.template = Hogan.compile(template);

        this.bindEvents();
      },

      bindEvents: function() {
        this.model.on('sync', _.bind(this.render, this));
      },

      editLand: function() {
        console.log('editLand');
        app.navigate("edit/" + this.model.id, {trigger: true});
      },

      render: function() {
        var data = this.model.toJSON();
        console.log('LandInfoView render', data);
        var html = this.template.render(data);

        this.$el.html(html);
        return this;
      }
    });
    return LandInfoView;
  }
);