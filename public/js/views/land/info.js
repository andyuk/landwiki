define([
  'backbone',
  'underscore',
  'hogan',
  'text!templates/land/info.html'
  ], function(Backbone, _, Hogan, template) {

  var LandInfoView = Backbone.View.extend({

    className: 'lw-info-panel',
    element: 'div',

    initialize: function() {
      console.log('LandInfoView init');
      this.template = Hogan.compile(template);

      this.bindEvents();
    },

    bindEvents: function() {
      this.model.on('sync', _.bind(this.render, this));
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

});




