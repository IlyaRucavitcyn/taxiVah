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

var map, currentLocation, marker, places;
var centerCoordContainer = document.getElementById('output');
var autocomplete;
var countryRestrict = {'country': 'georgia'};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15
  });

  var input =  document.getElementById('pac-input');
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
  autocomplete = new google.maps.places.Autocomplete(input);
  // autocomplete.bindTo('bounds', map);

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    map.setCenter(place.geometry.location)
  });

  map.addListener('center_changed', function () {
    var center = map.getCenter();
    centerCoordContainer.innerHTML = center.lat().toFixed(6) + ' : ' + center.lng().toFixed(6);
  })
}

getLocation();


// var localization = document.getElementById('locating-button');
// localization.addEventListener('click', function () {
//   getLocation();
// })
