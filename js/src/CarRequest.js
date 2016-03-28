var CarRequest = Backbone.View.extend({
  initialize: function (options) {
    this.router = options.router;
  },

  el:$("#car-request-container"),
  render: function () {
    this.setRequestAdress();
    $(this.el).addClass("active");
  },
  hide: function () {
    $(this.el).hide();
  },
  setRequestAdress: function () {
    var self = this;
    this.$inputAdress = $('#pac-input-car-request');
    this.$inputAdress.val(self.router.carRequestData.adress);
  },
  showingObj: {
    header:{ },
    footer:{ }
  }
});
