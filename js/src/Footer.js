var Footer = Backbone.View.extend({
  objToHide:{
    $el1:$("#phone-conformation"),
    $el2:$("#car-getting"),
    $el3:$("#phone-nonconformation")
  },
  hideAll: function () {
    for (var key in this.objToHide){
        this.objToHide[key].addClass('invisible');
    };
  },
  $phoneholder:$("#pac-input-phone"),
  events:{
    "click #phone-conformation" : function () {
        localStorage.setItem('phone', this.$phoneholder.val());
        sessionStorage.setItem("visited", true);
        Backbone.history.loadUrl();
        return false;
    },
    "click #phone-nonconformation" : function () {
        sessionStorage.setItem("visited", true);
        Backbone.history.loadUrl();
        return false;
    }
  },
  el:$("#footer-container"),
  render: function (obj) {
    this.hideAll();
    $(this.el).addClass("active");
    if (arguments.length){
      for (var key in obj){
        obj[key].removeClass('invisible').addClass('visible');
      }
    };
  }
});
