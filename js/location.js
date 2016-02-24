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
    centerCoordContainer.innerHTML = currentLocation['lat'].toFixed(4) + ' : ' + currentLocation['lng'].toFixed(4);
}

var map, currentLocation, marker;
var centerCoordContainer = document.getElementById('output');

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15
  });

 //  marker = new google.maps.Marker({
 //    map: map,
 // });

 // map.addListener('center_changed', function () {
 //   marker.setPosition(map.getCenter());
 // })
}

getLocation();


// var localization = document.getElementById('locating-button');
// localization.addEventListener('click', function () {
//   getLocation();
// })
