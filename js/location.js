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
    // marker.setPosition(currentLocation)
}

var map, currentLocation, marker;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15
  });

 //  marker = new google.maps.Marker({
 //    map: map,
 // });

//  map.addListener('center_changed', function () {
//    marker.setPosition(map.getCenter());
//  })
}

getLocation();


// var localization = document.getElementById('locating-button');
// localization.addEventListener('click', function () {
//   getLocation();
// })
