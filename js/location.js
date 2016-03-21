// Creating backbone sceletone

var Navig = Backbone.Router.extend({
  initialize: function () {
    var self = this;
    this.start = new Start({router:self});
    this.locate = new Locate({router:self});
    this.phonerequest = new PhoneRequest();
    this.carRequest = new CarRequest({router:self});
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          self.start.setMapCenter({lat:pos.coords.latitude, lng:pos.coords.longitude});
        });
    };
  },
  carRequestData:{
    lat:41.6421855,
    lng:41.6259929,
    adress:"77/88 Chavchavadze St,Batumi,Грузия"
  },
  routes: {
    "": "starting",
    "!/": "startingLocation",
    "!/location": "locating",
    "!/request":"request"
  },
  starting: function () {
    var self = this;
    $(".block").hide();
    if(!localStorage.getItem('phone')&&!sessionStorage.getItem('visited')) {
        self.phonerequest.render();
    } else {
        self.start.render();
    }
  },
  startingLocation: function () {
    var self = this;
    $(".block").hide();
    // this.locate.hide();
    this.start.render();
    this.start.setMapCenter({
        lat: self.carRequestData.lat,
        lng: self.carRequestData.lng
    });
  },
  locating: function () {
    $(".block").hide();
    this.locate.render();
  },
  request:function () {
    $(".block").hide();
    this.carRequest.render();
  }
});

var PhoneRequest = Backbone.View.extend({
   el:$("#phone-request"),
   $phoneholder:$("#pac-input-phone"),
   render: function () {
    $(this.el).show()
   },
   events:{
     "click #phone-conformation" : function () {
         localStorage.setItem('phone', this.$phoneholder.val());
         sessionStorage.setItem("visited", true);
     },
     "click #phone-nonconformation" : function () {
         sessionStorage.setItem("visited", true);
     }
   },
   hide: function () {
    $(this.el).hide();
  },
});

var Start = Backbone.View.extend({
  initialize: function (options) {
    this.createMap();
    this.router = options.router;
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
        center: {lat: 41.6421855, lng: 41.6259929},
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
  }
});

var Locate = Backbone.View.extend({
  initialize: function (options) {
    this.createSelfLocation();
    this.router = options.router;
  },
  el:$("#self-location-container"),
  events:{
    "click #self-locating-link" : function () {
        var self = this;
        self.router.carRequestData.lat = self.autocompleteSelfLocation.getPlace().geometry.location.lat();
        self.router.carRequestData.lng = self.autocompleteSelfLocation.getPlace().geometry.location.lng();
        self.router.carRequestData.adress = self.autocompleteSelfLocation.getPlace().formatted_address;
    }
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
    // this.autocompleteSelfLocation.addListener('place_changed', function() {
    //   var place = self.autocompleteSelfLocation.getPlace();
    //   self.router.carRequestData.lat = place.geometry.location.lat();
    //   self.router.carRequestData.lng = place.geometry.location.lng();
    //   self.router.carRequestData.adress = place.formatted_address;
    // });
  }
});

var CarRequest = Backbone.View.extend({
  initialize: function (options) {
    this.router = options.router;
  },
  el:$("#car-request-container"),
  render: function () {
    this.setRequestAdress();
    $(this.el).show();
  },
  hide: function () {
    $(this.el).hide();
  },
  setRequestAdress: function () {
    var self = this;
    this.$inputAdress = $('#pac-input-car-request');
    this.$inputAdress.val(self.router.carRequestData.adress);
  }

});

var route = new Navig();
Backbone.history.start();
