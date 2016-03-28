var Start = Backbone.View.extend({
  initialize: function (options) {
    this.createMap();
    this.router = options.router;
  },
  el:$("#screen-container"),
  render: function () {
    $(this.el).addClass("active");
  },
  hide: function () {
    $(this.el).hide();
  },
  createMap: function () {
    var self = this;
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.6421855, lng: 41.6259929},
        zoom: 15,
        mapTypeControl: false
    });
    this.input =  document.getElementById('pac-input');
    // this.autocomplete = new google.maps.places.Autocomplete(this.input);
    this.geocoder = new google.maps.Geocoder;
    this.map.addListener('center_changed', function () {
      var center = self.map.getCenter();
      self.geocoder.geocode({'location': { lat:center.lat(), lng: center.lng() }}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                self.input.value = results[0].formatted_address;
                self.router.carRequestData.lat = results[0].geometry.location.lat();
                self.router.carRequestData.lng = results[0].geometry.location.lng();
                self.router.carRequestData.adress = results[0].formatted_address;
              } else {
                self.input.value = "No results found";
              }
            }
      });
    });
  },
  setMapCenter: function (center){
    this.map.setCenter(center);
  },
  showingObj: {
    header:{
      $el1:$("#go-to-location")
    },
    footer:{
      $el3:$("#car-getting")
    }
  }
});
