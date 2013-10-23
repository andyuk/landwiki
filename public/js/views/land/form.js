define([
  'backbone',
  'underscore',
  'hogan',
  'text!templates/land/form.html'
  ], 
  function(Backbone, _, Hogan, template) {

    var LandFormView = Backbone.View.extend({

      initialize: function() {
        console.log('LandFormView init');
        this.template = Hogan.compile(template);

        //this.bindEvents();
      },

      render: function() {
        var data = this.model.toJSON();
        console.log('LandFormView render', data);
        var html = this.template.render(data);

        this.$el.html(html);
        return this;
      }
    });
    return LandFormView;
  }
);