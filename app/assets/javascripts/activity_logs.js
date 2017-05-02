//= require ./components/activity_logs/event_application.js.jsx
//= require ./components/activity_logs/event_table.js.jsx
//= require ./components/activity_logs/event.js.jsx
//= require ./components/activity_logs/search_form.js.jsx
//= require ./components/activity_logs/new_form.js.jsx
//= require moment.min.js
//= require bootstrap-datetimepicker
//= require bootstrap.min.js

$(document).ready(function(){
	Object.keys(babies_hash).forEach(function (key) { 

	  var value = babies_hash[key]
	  var select_add = $('form[role="add"] #baby_id');
	  var opt_add = document.createElement('option');
	  opt_add.value = key;
	  opt_add.innerHTML = value;
	  $(select_add).append(opt_add);

	  var select_search = $('form[role="search"] #baby_id');
	  var opt_search = document.createElement('option');
	  opt_search.value = key;
	  opt_search.innerHTML = value;
	  $(select_search).append(opt_search);
	});

	Object.keys(assistants_hash).forEach(function (key) { 

	  var value = assistants_hash[key]
	  var select_add = $('form[role="add"] #assistant_id');
	  var opt_add = document.createElement('option');
	  opt_add.value = key;
	  opt_add.innerHTML = value;
	  $(select_add).append(opt_add);

	  var select_search = $('form[role="search"] #assistant_id');
	  var opt_search = document.createElement('option');
	  opt_search.value = key;
	  opt_search.innerHTML = value;
	  $(select_search).append(opt_search);
	});

	Object.keys(activities_hash).forEach(function (key) { 

	  var value = activities_hash[key]
	  var select_add = $('form[role="add"] #activity_id');
	  var opt_add = document.createElement('option');
	  opt_add.value = key;
	  opt_add.innerHTML = value;
	  $(select_add).append(opt_add);
	});

	$('#datetimepicker1').datetimepicker({
		sideBySide: true,
		format: 'YYYY/MM/DD H:mm:ss'
	});

	$(document).on("dp.change", "#datetimepicker1", function(e) {
		// $(".start_time").val().trigger('change');
		$(".start_time").trigger( "click" );
		$("#baby_id").trigger( "click" );
	});
});
