$(document).ready(function() {

			
	$(document).on("contextmenu", function() {
		return false;
	});
	
	
	$("#accordion").accordion({
		heightStyle: "fill",
		collapsible: true
	});

	// add functionality to the scrollers (both clicks, and hovers)
	$("#rightScroller").click(function() {
		this.iid && clearInterval(this.iid);
		var p = $("#planner");
		p.animate({scrollLeft: p.scrollLeft()+yearWidth+3}, 500);
	});

	$("#leftScroller").click(function() {
		this.iid && clearInterval(this.iid);
		var p = $("#planner");
		p.animate({scrollLeft: p.scrollLeft()-yearWidth+3}, 500);
	});


	// wait 1 second, and then start moving
	var int1, int2, int3, int4;
	$("#rightScroller").on('mouseenter', function() {
		int1 = setInterval(function() {
			int1 && clearInterval(int1);
			int2 = setInterval(function() {
				var p = $("#planner");
				p.animate({scrollLeft: p.scrollLeft()+1}, 0);
			}, 3);
		}, 1000);
	}).on('mouseleave', function(){
		int1 && clearInterval(int1);
		int2 && clearInterval(int2);
	});

	$("#leftScroller").on('mouseenter', function() {
		int3 = setInterval(function() {
			int3 && clearInterval(int3);
			int4 = setInterval(function() {
				var p = $("#planner");
				p.animate({scrollLeft: p.scrollLeft()-1}, 0);
			}, 3);
		}, 1000);
	}).on('mouseleave', function(){
		int3 && clearInterval(int3);
		int4 && clearInterval(int4);
	});

	// handle left-right resizing of the #rightContainer div
	// creates a ghostbar that indicates where the div will be resized to when released
	var dragging = false;
	$('#verticalGrabber').mousedown(function(e){
	   e.preventDefault();

	   dragging = true;
	   var main = $('#leftContainer');
	   var ghostbarW = $('<div>',
						{id:'ghostbarW',
						 css: {
								height: main.outerHeight(),
								top: main.offset().top,
								left: main.offset().left
							   }
						}).appendTo('body');

		$(document).mousemove(function(e){
		  if(e.pageX+2 < window.innerWidth-200 && e.pageX+2 > 250){
			ghostbarW.css("left",e.pageX+2);
		  }
	   });

	});

	// handle up-down resizing of the #finder div
	// creates a ghostbar that indicates where the div will be resized to when released
	var dragging2 = false;
	$('#horizontalGrabber').mousedown(function(e){
	   e.preventDefault();

	   dragging2 = true;
	   var main = $('#planner');
	   var ghostbarH = $('<div>',
						{id:'ghostbarH',
						 css: {
								width: main.outerWidth(),
								top: main.offset().top,
								left: main.offset().left
							   }
						}).appendTo('body');

		$(document).mousemove(function(e){
		  if(e.pageY+2 < window.innerHeight-200 && e.pageY+2 > 500){
			ghostbarH.css("top",e.pageY+2);
		  }
	   });

	});

	// resize the divs
	$(document).mouseup(function(e){
		
	   if (dragging)
	   {
		   var sideWidth;
		   if(e.pageX >= window.innerWidth-200){
			  sideWidth = 200;
		   }else if(e.pageX < 250){
			  sideWidth = window.innerWidth-250;
		   }else{
			  sideWidth = window.innerWidth - e.pageX;
		   }

		   $('#rightContainer').css("width",sideWidth + "px");

		   var c = "calc(100% - " + sideWidth + "px)"

		   $('#leftContainer').css("width",c);
		   $('#ghostbarW').remove();
		   $(document).unbind('mousemove');
		   dragging = false;
	   } else if (dragging2)
	   {
		   var sideWidth;
		   if(e.pageY >= window.innerHeight-200){
			  sideWidth = 200;
			   }else if(e.pageY < 500){
			  sideWidth = window.innerHeight-500;
		   }else{
			  sideWidth = window.innerHeight - e.pageY;
		   }

		   $('#finderWrapper').css("height",sideWidth + "px");

		   var c = "calc(100% - " + sideWidth + "px)"

		   $('#planner').css("height",c);
		   $('#ghostbarH').remove();
		   $(document).unbind('mousemove');
		   dragging2 = false;
	   }
	});

	// hide dropdown menu if the user clicks outside of it
	window.onclick = function(event) {
	  if (!event.target.matches('#options-btn')) {

		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
		  var openDropdown = dropdowns[i];
		  if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
		  }
		}
	  }
	}
		
	$("#classFinder").css("height", "calc(100% - 40px)");
	$("#tablePane").slimScroll({height : 'calc(100% - 8px)'});
	$("#tablePane").css("width","100%");

	var data = $.getData();
    var plan_data = data['plan'];
    var course_data = data['courses'];
	displayPlan(plan_data, true);
    populateFinder(course_data);
	
	checkScrollers();
});
