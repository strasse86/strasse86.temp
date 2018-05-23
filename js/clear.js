$(document).ready(function() {
	  $('#clear').click(function() {
		  $("#reddit-content").html("");
		  $("#loading").html("");
		  $("#database").html("");
		  $("#results").html("");
		  $("#progress_comments").html("");
		  $("#progress_posts").html("");
		  $("#con").html("");
		  $("#con1").html("");
		  $("#con").append('<canvas id="myChart" width="400" height="500"></canvas>');
		  $("#con1").append('<canvas id="myChart1" width="400" height="500"></canvas>');
		  var ctx = document.getElementById("myChart").getContext('2d');
		  var ctxx = document.getElementById("myChart1").getContext('2d');
	    });
});
