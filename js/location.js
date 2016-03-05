// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         alert('Geolocation is not suppurted');
//     }
// }
//
// function showPosition(pos) {
//     currentLocation = {
//       lat: pos.coords.latitude,
//       lng: pos.coords.longitude
//     };
//     map.setCenter(currentLocation);
//     centerCoordContainer.innerHTML = currentLocation['lat'].toFixed(6) + ' : ' + currentLocation['lng'].toFixed(6);
// }

// var map, currentLocation, marker;
// var centerCoordContainer = document.getElementById('output');
// var autocomplete, autocompleteSelfLocation, geocoder;
// var countryRestrict = {'country': 'georgia'};

// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 15
//   });
//
//   var input =  document.getElementById('pac-input');
//   var inputSelfLocation = document.getElementById('pac-input-self-location');
//
//   autocomplete = new google.maps.places.Autocomplete(input);
//   autocompleteSelfLocation = new google.maps.places.Autocomplete(inputSelfLocation);
//
//   geocoder = new google.maps.Geocoder;
//
//   autocomplete.addListener('place_changed', function() {
//     var place = autocomplete.getPlace();
//     map.setCenter(place.geometry.location);
//   });
//
//   autocompleteSelfLocation.addListener('place_changed', function() {
//     var place = autocompleteSelfLocation.getPlace();
//     map.setCenter(place.geometry.location);
//   });
//
//   map.addListener('center_changed', function () {
//     var center = map.getCenter();
//     centerCoordContainer.innerHTML = center.lat().toFixed(6) + ' : ' + center.lng().toFixed(6);
//
//     geocoder.geocode({'location': { lat:center.lat(), lng: center.lng() }}, function(results, status) {
//       if (status === google.maps.GeocoderStatus.OK) {
//         if (results[0]) {
//           input.value = results[0].formatted_address;
//         } else {
//           // window.alert('No results found');
//           input.value = "No results found";
//         }
//       }
//     });
//   })
// }

// getLocation();

// Creating backbone sceletone

var Navig = Backbone.Router.extend({
  routes: {
    "": "start",
    "!/": "start",
    "!/location": "location"
  },

  start: function() {
    locate.hide();
    start.render();
  },

  location: function () {
    start.hide();
    locate.render();
  },
});

var route = new Navig();

var Start = Backbone.View.extend({

  initialize: function (options) {
    this.createMap();
  },
  el:$("#screen-container"),
  events:{
    "click button":"currentLocation"
  },
  render: function () {
    $(this.el).show();
  },
  hide: function () {
    $(this.el).hide();
  },
  createMap: function () {
    var self = this;
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15
    });

    this.input =  document.getElementById('pac-input');
    this.autocomplete = new google.maps.places.Autocomplete(this.input);
    this.geocoder = new google.maps.Geocoder;

    //   this.autocomplete.addListener('place_changed', function() {
    //     var place = self.autocomplete.getPlace();
    //     self.map.setCenter(place.geometry.location);
    //   });


    this.map.addListener('center_changed', function () {
      var center = self.map.getCenter();
      $('#output').html(center.lat().toFixed(6) + ' : ' + center.lng().toFixed(6));
      self.geocoder.geocode({'location': { lat:center.lat(), lng: center.lng() }}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                self.input.value = results[0].formatted_address;
              } else {
                // window.alert('No results found');
                self.input.value = "No results found";
              }
            }
          });
    });
  }
});


var Locate = Backbone.View.extend({
  initialize: function () {
    this.createSelfLocation();
  },
  el:$("#self-location-container"),
  events:{
    "click button.self-location-button":"locate"
  },
  render: function () {
    $(this.el).show();
  },
  hide: function () {
    $(this.el).hide();
  },
  createSelfLocation: function () {
    var self = this;
    this.inputSelfLocation = document.getElementById('pac-input-self-location');
    this.autocompleteSelfLocation = new google.maps.places.Autocomplete(this.inputSelfLocation);
  }
});

var start = new Start();
var locate = new Locate();

Backbone.history.start();
