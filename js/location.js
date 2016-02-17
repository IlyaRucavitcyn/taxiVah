var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.mapbox-terrain-v2',
    accessToken: 'pk.eyJ1IjoiaWx5YXJ1Y2F2aXRjeW4iLCJhIjoiY2lrcXNoMDNzMDAwbndsa3Fjcm9nanBjbSJ9.-8wpn-qT9eywD8_1SUqiOw'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);
