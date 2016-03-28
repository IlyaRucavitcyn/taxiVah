var Locate = Backbone.View.extend({
  initialize: function (options) {
    this.createSelfLocation();
    this.router = options.router;
  },
  el:$("#self-location-container"),
  render: function () {
    $(this.el).addClass("active");
  },
  hide: function () {
    $(this.el).hide();
  },
  createSelfLocation: function () {
    var self = this;
    this.inputSelfLocation = document.getElementById('pac-input-self-location');
    this.autocompleteSelfLocation = new google.maps.places.Autocomplete(this.inputSelfLocation);
    this.autocompleteSelfLocation.addListener('place_changed', function () {
      self.router.carRequestData.lat = self.autocompleteSelfLocation.getPlace().geometry.location.lat();
      self.router.carRequestData.lng = self.autocompleteSelfLocation.getPlace().geometry.location.lng();
      self.router.carRequestData.adress = self.autocompleteSelfLocation.getPlace().formatted_address;
      Backbone.history.navigate('!/', {trigger:true});

    })
  },
  showingObj: {
    header:{
      $el1:$("#return-starting-location")
    },
    footer:{}
  }
});
