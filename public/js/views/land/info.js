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
    },

    render: function() {
      console.log('LandInfoView render');
      var data = {
        title: "Untitled",
      };
      var html = this.template.render(data);

      this.$el.html(html);
      return this;
    }

  });

  return LandInfoView;

});




