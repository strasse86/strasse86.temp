var username;

var comments = [];
var posts = [];

var comments_counter = 0;
var posts_counter= 0;

$(document).ready(function() {
  $('#LOL').click(function() { 
     username  = $('#user').val(); 
     $('#loading').html("");
     $('#reddit-content').html("");
     $('loading').append('<i class="fa fa-refresh fa-spin fa-3x fa-fw "></i><span class="sr-only">Loading...</span>');
	$("#con").html("");
	$("#con1").html("");
	$("#con").append('<canvas id="myChart" width="400" height="600"></canvas>');
	$("#con1").append('<canvas id="myChart1" width="400" height="600"></canvas>');
	var ctx = document.getElementById("myChart").getContext('2d');
	var ctxx = document.getElementById("myChart1").getContext('2d');
	/* This function will get 100 posts per call, it calls itself within the function again */
	get_100_comments("https://www.reddit.com/user/" +username+ "/.json?jsonp=&limit=100&after=");
	get_100_posts("https://www.reddit.com/user/" +username+ "/submitted/.json?jsonp=&limit=100&after=");
	});
});

function get_100_posts(posts_url){
var next=0;
$.getJSON(
	posts_url,function foo(result) {
	/* Check if we need to call the funciton again or if we need to quit */
	if (result.data.after != null){
		var next = result.data.after;
		var posts_url = "http://www.reddit.com/user/" +username + "/submitted/.json?jsonp=&limit=100&after=" +next;
		get_100_posts(posts_url);
	}
	/* Here we analyze the json 100 pieces*/
	$.each(result.data.children.slice(0, 100),
	function (i, post) {
		
		posts_counter++;
		$("#progress_posts").html("");
		$("#progress_posts").append(posts_counter+  " posts analyzed.");
		posts.push(post.data.subreddit);
	});
	// This point we reached the end of ALL posts. The last JSON return NULL on result.data after
	if ( result.data.after == null){
	uniques(posts,"posts");
	posts.length = 0;
	posts_counter= 0;
	}
}).fail(function() {
	$('#progress_posts').html("");
	$('#progress_posts').append("User not found.");
	$('#loading').html("");
 });/* END OF .getJSON*/
};




function get_100_comments(comments_url){
var next=0;
$.getJSON(
	comments_url,function foo(result) {
	/* Check if we need to call the funciton again or if we need to quit */
	if (result.data.after != null){
	var next = result.data.after;
	var comments_url  = "http://www.reddit.com/user/" +username + "/.json?jsonp=&limit=100&after=" +next;
	get_100_comments(comments_url);
	}
	/* Here we analyze the json 100 pieces*/
	$.each(result.data.children.slice(0, 100),
	function (i, post) {
		if ( typeof post.data.body !== "undefined"){
		comments_counter++;
		$("#progress_comments").html("");
		$("#progress_comments").append(comments_counter +  " comments analyzed.");
		comments.push(post.data.subreddit);
		}
	});
	// This point we reached the end of ALL comments. The last JSON return NULL on result.data after
	if ( result.data.after == null){
	uniques(comments,"comments");
	comments.length = 0;
	comments_counter = 0;
	}
}).fail(function() {
	$('#progress_comments').html("");
	$('#progress').append("User not found.");
	$('#loading').html("");
 });/* END OF .getJSON*/
};


function uniques(items,who_called){
var nu = 0;
var hil = 0;
var don = 0;
var finalzz = [];
// Define in this scope the Array that we need to save the data.
var sole = items.unique();
//	$("#reddit-content").append('<hr>');
for (var i = 0; i < sole.length; i++) {
	var unique_number=0;
	for (var j = 0; j < items.length;j++){
		if (sole[i] == items[j]){
			unique_number = unique_number +1;
		}
	}
	// Adding the results to the finalzz array to be sorted be key.
	finalzz[sole[i]] = unique_number;
	nu = nu + unique_number;
}
$('#loading').html("");	
var LOL = sortByCount(finalzz);

var GL_ = [];
var GL_A = [];		

for (var key in LOL){
	if (LOL.hasOwnProperty(key)){               
		var per = ((LOL[key].total /  nu )*100).toFixed(2);
	// DO NOT REMOVE THIS Comment - here we should append the pure HTML Results if desired
	//$("#reddit-content").append(LOL[key].name + ":" + LOL[key].total +  ":" + per + "%<br>");
		GL_.push(LOL[key].name);
		GL_A.push(LOL[key].total);
	 }

}
var no_posts = 0;
var no_comments = 0;
var no_items = 0;
//02.08.17 Visualize results after completed.
if ( GL_.length == 0){
	no_items = 1;
}
DISP(GL_,GL_A,who_called,no_items);
}



function sortByCount (wordsMap) {
var finalWordsArray = [];
finalWordsArray = Object.keys(wordsMap).map(function (key) {
      return {
	   name: key,
	   total: wordsMap[key]
      };
 });

finalWordsArray.sort(function (a, b) {
     return b.total - a.total;
 });
return finalWordsArray;
}

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
		    if(this[i] === v) return true;
			}
	return false;
};

Array.prototype.unique = function() {
    var arr = [];
	for(var i = 0; i < this.length; i++) {
			if(!arr.contains(this[i])) {
					    arr.push(this[i]);
						    }
			    }
	    return arr; 
}
