var Header = Backbone.View.extend({
  objToHide:{
    $el1:$("#go-to-location"),
    $el2:$("#return-starting-location")
  },
  hideAll: function () {
    for (var key in this.objToHide){
      this.objToHide[key].addClass('invisible');
    };
  },
  el:$("#header-container"),
  render: function (obj) {
    this.hideAll();
    $(this.el).addClass("active");
    if (arguments.length){
      for (var key in obj){
        obj[key].removeClass('invisible').addClass("visible");
      }
    };
  }
});
