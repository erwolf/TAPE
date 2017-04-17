/* 	scroller_fns.js
	
	Provides the JavaScript for the scrollers on the #planner div
	
	TAPE Website
	Noah Shinabarger, Timothy Smith, Emily Wolf
	Project #3
	February 28th, 2017 */

// every 200 milliseconds, check if we need to resize the scrollers
function checkScrollers(){
	setInterval(function() {
		var p1 = $("#planner");
		var p2 = document.getElementById("planner");
		var l = document.getElementById("leftScroller");
		if(l != null && p1.scrollLeft() == 0){
			l.style.width = "5px";
			l.style.fontSize = "5px";
		} else if(l != null){
			l.style.width = "25px";
			l.style.fontSize = "25px";
		}
		
		var r = document.getElementById("rightScroller");
		if(r != null && p1.scrollLeft() == p2.scrollWidth - p2.clientWidth){
			r.style.width = "5px";
			r.style.fontSize = "5px";
		} else if(r != null){
			r.style.width = "25px";
			r.style.fontSize = "25px";
		}		
	}, 200);
}