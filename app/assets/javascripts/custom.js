$(document).ready(function(){
	$('.dropdown-toggle').dropdown();

  // Custom Selects
  if ($('[data-toggle="select"]').length) {
    $('[data-toggle="select"]').select2();
  }
});

function createNotification(alert_type, text){
  // Get var to insert alert
  var insert_alerts_here = document.getElementById("upload-alerts");

  var alert = '<div class="alert alert-'+alert_type+' alert-dismissible fade in">\
                <a href="#" class="close" data-dismiss="alert" aria-label="close" style="right: 0px;">&times;</a>\
                '+ text +'\
              </div>';

  insert_alerts_here.innerHTML = insert_alerts_here.innerHTML + alert;
  go_to_up_page();
}

function go_to_up_page(){
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
    } else {
        $('.scrollup').fadeOut();
    }
  });

  $("html, body").animate({
    scrollTop: 0
  }, 500);
}
