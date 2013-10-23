define([
  'backbone',
  'underscore',
  'models/land',
  'views/land/info'
  ], function(Backbone, _, LandModel, LandInfoView) {

  var MapView = Backbone.View.extend({

    initialize: function() {
      this.map = null;
      this.layer = null;
      this.searchBox = null;
      this.$sizeFilterOptions = $('#filters input');

      this.initMap();
      this.viewLandInfo('http://www.landwiki.org.uk/land/5210fc910ee31cfe59002b1f');
    },

    initMap: function() {
      google.maps.visualRefresh = true;
      this.map = new google.maps.Map(this.el, {
        center: new google.maps.LatLng(52.725390548214925, -1.745800962499966),
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend'));

      this.layer = new google.maps.FusionTablesLayer({
        map: this.map,
        heatmap: { enabled: false },
        query: this.getQuery(),
        options: {
          styleId: 2,
          templateId: 2
        }
      });

    },

    bindEvents: function() {
      var input = document.getElementById('search');
      this.searchBox = new google.maps.places.SearchBox(input);
      google.maps.event.addListener(this.searchBox, 'places_changed', _.bind(this.zoomToPlace, this));

      this.$sizeFilterOptions.on('change', _.bind(this.updateMapQuery, this));

      var self = this;
      this.$el.on('click', '.googft-info-window a', function() {
        self.handleLandDetailLink(this);
        return false;
      });
    },

    handleLandDetailLink: function(link) {
      // Unfortunately Google does not allow us to use data attributes in the template
      // So we must pluck the ID out manually.
      var id = link.href.substr(link.href.lastIndexOf('/')+1, link.href.length);

      console.log('land id', id);
      this.viewLandInfo(id);
    },

    viewLandInfo: function(id) {
      var landModel = new LandModel({
        id: '5267f0af93750a3e0269cdc1'
      });
      landModel.fetch();

      if (! this.infoPanel)
        this.infoPanel = new LandInfoView({ model: landModel});
      this.infoPanel.render();
      if (this.infoPanel.$el.parent().length === 0)
        this.infoPanel.$el.appendTo(this.$el.parent());      
    },

    updateMapQuery: function() {
      var conditions = [];
      this.$sizeFilterOptions.each(function() {
        if (! this.checked)
          return;
        conditions.push($(this).data('query'));
      });
      var applyFilter = conditions.length > 0 && conditions.length !== this.$sizeFilterOptions.length;
      var whereClause = applyFilter ? conditions.join(' OR ') : '';
      console.log('query', whereClause);

      this.layer.setQuery(this.getQuery(whereClause));
    },

    zoomToPlace: function() {
      var places = this.searchBox.getPlaces();
      this.map.setCenter(places[0].geometry.location);
      this.map.setZoom(14);
    },

    getQuery: function (whereClause) {
      return {
        select: "col1",
        from: "1i3YjHvkMCfoc3HMbEWWec1W3gdtOZpJZf4_P87o",
        where: whereClause || ''
      };
    },

    render: function() {
      // content is pre-prendered on index page
      return this;
    }

  });

  return MapView;
});