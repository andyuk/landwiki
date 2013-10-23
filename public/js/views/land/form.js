define([
  'backbone',
  'underscore',
  'hogan',
  'text!templates/land/form.html',
  'epiceditor',
  'marked',
  'tagsinput'
  ],
  function(Backbone, _, Hogan, template, EpicEditor, Marked, tagsinput) {

    var LandFormView = Backbone.View.extend({

      events: {
        "click button.close"      : "close"
      },

      initialize: function() {
        _.bindAll(this, 'render', 'postRender');

        this.mdEditor = null;
        this.template = Hogan.compile(template);

        this.bindEvents();
        //this.createMarkdownEditor();
      },

      bindEvents: function() {
        this.model.on('sync', this.render);
      },

      unbindEvents: function() {
        this.model.off('sync', this.render);
      },

      close: function() {
        this.unbindEvents();
        this.remove();
      },

      getEditorOptions: function() {
        var opts = {
          container: 'md-editor',
          textarea: 'text',
          basePath: '/components/EpicEditor/epiceditor',
          clientSideStorage: true,
          localStorageName: 'epiceditor',
          useNativeFullscreen: true,
          // Marked is included separately since EpicEditor does not play not with 
          // requirejs (multiple globals defined in a single file)
          parser: Marked,
          theme: {
            base: '/themes/base/epiceditor.css',
            preview: '/themes/preview/github.css',
            editor: '/themes/editor/epic-light.css'
          }
        };
        return opts;
      },

      postRender: function() {
        $('#labels').tagsInput({
          'defaultText': 'add label',
          'height':'auto',
          'width':'400px',
        });
        this.mdEditor = new EpicEditor(this.getEditorOptions());
        this.mdEditor.load();
      },

      render: function() {
        var data = this.model.toJSON();
        var html = this.template.render(data);
        this.$el.html(html);

        setTimeout(this.postRender, 0);

        return this;
      }
    });
    return LandFormView;
  }
);