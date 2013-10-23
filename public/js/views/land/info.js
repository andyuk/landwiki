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
        "click a[rel=edit-land]"  : "editLand",
        "click button.close"      : "close"
      },

      initialize: function() {
        _.bindAll(this, ['render']);

        this.template = Hogan.compile(template);

        this.bindEvents();
      },

      bindEvents: function() {
        this.model.on('sync', this.render);
      },

      unbindEvents: function() {
        this.model.off('sync', this.render);
      },

      editLand: function() {
        app.navigate("edit/" + this.model.id, {trigger: true});
      },

      close: function() {
        this.unbindEvents();
        this.remove();
      },

      render: function() {
        var data = this.model.toJSON();
        var html = this.template.render(data);
        this.$el.html(html);
        return this;
      }
    });
    return LandInfoView;
  }
);