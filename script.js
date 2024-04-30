$(document).ready(function() {

  $('.inputs').submit(function() {
    var $inputs = $('.inputs : input');

    var values = {};
    $inputs.each(function() {
      values[this.name] = $(this).val();
    });

    console.log(values);
  });

});
