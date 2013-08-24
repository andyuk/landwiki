
var map,
    layer;

function initialize() {
  google.maps.visualRefresh = true;
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(52.725390548214925, -1.745800962499966),
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend'));

  layer = new google.maps.FusionTablesLayer({
    map: map,
    heatmap: { enabled: false },
    query: getQuery(),
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  var input = /** @type {HTMLInputElement} */(document.getElementById('search'));
  var searchBox = new google.maps.places.SearchBox(input);
  var markers = [];

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    map.setCenter(places[0].geometry.location);
    map.setZoom(14);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

$(function() {
  var $sizeFilterOptions = $('#filters input');
  $sizeFilterOptions.on('change', function() {
    
    var conditions = [];
    $sizeFilterOptions.each(function() {
      if (! this.checked)
        return;
      conditions.push($(this).data('query'));
    });
    var applyFilter = conditions.length > 0 && conditions.length !== $sizeFilterOptions.length;
    var whereClause = applyFilter ? conditions.join(' OR ') : '';
    console.log('query', whereClause);

    layer.setQuery(getQuery(whereClause));
  });
});

function getQuery(whereClause) {
  return {
    select: "col1",
    from: "1i3YjHvkMCfoc3HMbEWWec1W3gdtOZpJZf4_P87o",
    where: whereClause || ''
  };
}