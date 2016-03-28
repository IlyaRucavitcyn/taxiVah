var Navig = Backbone.Router.extend({
  initialize: function () {
    var self = this;
    this.start = new Start({router:self});
    this.locate = new Locate({router:self});
    this.phonerequest = new PhoneRequest();
    this.carRequest = new CarRequest({router:self});
    this.header = new Header();
    this.footer = new Footer();
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
    $(".block").removeClass("active");
    if(!localStorage.getItem('phone')&&!sessionStorage.getItem('visited')) {
        self.phonerequest.render();
        self.header.render(self.phonerequest.showingObj.header);
        self.footer.render(self.phonerequest.showingObj.footer);
    } else {
        self.start.render();
        self.header.render(self.start.showingObj.header);
        self.footer.render(self.start.showingObj.footer);
    }
  },
  startingLocation: function () {
    var self = this;
    $(".block").removeClass("active");
    this.start.render();
    this.header.render(self.start.showingObj.header);
    this.footer.render(self.start.showingObj.footer);
    this.start.setMapCenter({
        lat: self.carRequestData.lat,
        lng: self.carRequestData.lng
    });
  },
  locating: function () {
    var self =this;
    $(".block").removeClass("active");
    this.locate.render();
    self.header.render(self.locate.showingObj.header);
    self.footer.render(self.locate.showingObj.footer);
  },
  request:function () {
    var self =this;
    $(".block").removeClass("active");
    this.carRequest.render();
    this.header.render(self.carRequest.showingObj.header);
    this.footer.render(self.carRequest.showingObj.footer);
  }
});
