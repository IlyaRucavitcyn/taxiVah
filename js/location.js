function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not suppurted');
    }
}

function showPosition(pos) {
    currentLocation = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    };
    map.setCenter(currentLocation);
    centerCoordContainer.innerHTML = currentLocation['lat'].toFixed(6) + ' : ' + currentLocation['lng'].toFixed(6);
}

var map, currentLocation, marker;
var centerCoordContainer = document.getElementById('output');
var autocomplete, geocoder;
var countryRestrict = {'country': 'georgia'};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15
  });

  var input =  document.getElementById('pac-input');
  autocomplete = new google.maps.places.Autocomplete(input);
  // autocomplete.bindTo('bounds', map);
  geocoder = new google.maps.Geocoder;

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    map.setCenter(place.geometry.location);

  });

  map.addListener('center_changed', function () {
    var center = map.getCenter();
    centerCoordContainer.innerHTML = center.lat().toFixed(6) + ' : ' + center.lng().toFixed(6);

        geocoder.geocode({'location': { lat:center.lat(), lng: center.lng() }}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            input.value = results[1].formatted_address;
          } else {
            // window.alert('No results found');
            input.value = "No results found";
          }
        }
      });
  })
}

getLocation();
