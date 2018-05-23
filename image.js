
function DISP(a,b,who_called,no_items){
	var label = "";
	if ( who_called == "comments"){
		label = "# of Comments";
		if ( no_items == 1){
			$('#progress_comments').html(username + " has no comments");
			return
		}
		var ctx = document.getElementById("myChart").getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'horizontalBar',
			data: {
				labels:a ,
				datasets: [{
				label: label,
				data: b,
				}]
			},// end of data
			options: {
				scales: {
					yAxes: [{
						maxBarThickness: 80,
					ticks: {
						beginAtZero:false
					}
				}],
				xAxes:[{
					ticks:{stepSize:1,
						beginAtZero:true
					}
					}]
				}
			}
		});
	}
	if ( who_called == "posts"){
		label = "# of Posts";
		if ( no_items == 1){
			$('#progress_posts').html(username + " has no posts");
			return;
		}
		var ctxx = document.getElementById("myChart1").getContext('2d');
		var myChart1 = new Chart(ctxx, {
			type: 'horizontalBar',
			data: {
				labels:a ,
				datasets: [{
				label: label,
				data: b,
				}]
			},// end of data
			options: {
				scales: {
					yAxes: [{
						maxBarThickness: 80,
						ticks: {
							beginAtZero:false
						}
					}],
					xAxes:[{
						ticks:{stepSize:1,
							beginAtZero:true
						}
					}]
				}
			}
		});
	}
}
