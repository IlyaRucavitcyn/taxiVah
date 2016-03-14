// Creating backbone sceletone

var Navig = Backbone.Router.extend({
  initialize: function () {
    var self = this;
    this.start = new Start();
    this.locate = new Locate();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          self.start.setMapCenter({lat:pos.coords.latitude, lng:pos.coords.longitude});
        });
    }
  },
  carRequestData:{},
  routes: {
    "": "starting",
    "!/": "starting",
    "!/start/:location": "selfLocating",
    "!/location": "locating"
  },
  starting: function() {
    this.locate.hide();
    this.start.render();
  },

  selfLocating: function () {
    var self = this;
    this.locate.hide();
    this.start.render();
    this.start.setMapCenter({
        lat: self.carRequestData.lat,
        lng: self.carRequestData.lng
    });
  },
  locating: function () {
    this.start.hide();
    this.locate.render(this.locate.coordinates);
  }
});

var Start = Backbone.View.extend({
  initialize: function (options) {
    this.createMap();
  },
  el:$("#screen-container"),
  render: function () {
    $(this.el).show();
  },
  hide: function () {
    $(this.el).hide();
  },
  createMap: function () {
    var self = this;
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.645833, lng: 41.641667},
        zoom: 15
    });
    this.input =  document.getElementById('pac-input');
    this.autocomplete = new google.maps.places.Autocomplete(this.input);
    this.geocoder = new google.maps.Geocoder;
    this.map.addListener('center_changed', function () {
      var center = self.map.getCenter();
      self.geocoder.geocode({'location': { lat:center.lat(), lng: center.lng() }}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                self.input.value = results[0].formatted_address;
                route.carRequestData.lat = results[0].geometry.location.lat();
                route.carRequestData.lng = results[0].geometry.location.lng();
                route.carRequestData.adress = results[0].formatted_address;
              } else {
                self.input.value = "No results found";
              }
            }
      });
    });
  },
  setMapCenter: function (center){
    this.map.setCenter(center);
  }
});

var Locate = Backbone.View.extend({
  initialize: function () {
    this.createSelfLocation();
  },
  template: _.template($('#self-location-link').html()),
  el:$("#self-location-container"),
  coordinates: {lat: 41.645833, lng: 41.641667},
  render: function () {
    $("#template-container").html(this.template());
    $(this.el).show();
  },
  hide: function () {
    $(this.el).hide();
  },
  createSelfLocation: function () {
    var self = this;
    this.inputSelfLocation = document.getElementById('pac-input-self-location');
    this.autocompleteSelfLocation = new google.maps.places.Autocomplete(this.inputSelfLocation);

    this.autocompleteSelfLocation.addListener('place_changed', function() {
      var place = self.autocompleteSelfLocation.getPlace();
      route.carRequestData.lat = place.geometry.location.lat();
      route.carRequestData.lng = place.geometry.location.lng();
      route.carRequestData.adress = place.formatted_address;
      $("#template-container").html(self.template());
    });
  }
});

var route = new Navig();
Backbone.history.start();
