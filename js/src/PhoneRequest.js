var PhoneRequest = Backbone.View.extend({
   el:$("#phone-request"),
   render: function () {
    $(this.el).addClass("active")
   },
   hide: function () {
    $(this.el).hide();
  },
  showingObj: {
    header:{ },
    footer:{
      $el1:$("#phone-conformation"),
      $el2:$("#phone-nonconformation")
    }
  }
});
