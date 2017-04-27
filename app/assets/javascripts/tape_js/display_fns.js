/* 	display_fns.js

	Provides the JavaScript for displaying the plan on the screen

	TAPE Website
	Noah Shinabarger, Timothy Smith, Emily Wolf
	Project #2
	February 14th, 2017 */

// variables needed for displaying
var displaySummer = true;
var yearWidth = null;

var plan;

/* FUNCTION DEFINITIONS */
// function to display the plan in the #planner div
function displayPlan2(summerShow){
	displayPlan(plan, summerShow);
}

function displayPlan(myPlan, summerShow){
  var totalCreds = 0;
	plan = myPlan;


	var planner = document.getElementById("planner");

	var planWidth = planner.clientWidth;
	yearWidth = (planWidth/4 - 15);

	if(yearWidth < 250) yearWidth = 250;

	var yearWidthStr = "" + yearWidth + "px";

	// clear the planner out
	while(planner.firstChild){
		planner.removeChild(planner.firstChild);
	}

	// loop over every year in the plan
	var years = plan.years;
	for(var i=0; i<years.length; i++){
	    if(years[i] == null) continue;
		// create the year
		var year = document.createElement("div");
		year.setAttribute("class", "year");
		year.style.minWidth = yearWidthStr;
		year.style.maxWidth = yearWidthStr;
		year.id = i;
		planner.appendChild(year);

		// loop over every semester in the year
		var sems = years[i].terms;
		for(var j=0; j<sems.length; j++){

			// create semester
			var semester = document.createElement("div");
			semester.id = j;
			semester.dataset.ruby_id = parseInt(sems[j].id);
			if(j != 2){
				semester.setAttribute("class", "semester spring");
				if(!summerShow) semester.style.width="46%";
			} else{
				semester.setAttribute("class", "semester summer");
				if(!summerShow) break;
			}
			year.appendChild(semester);

			// create semester heading
			var heading = document.createElement("div");
			heading.setAttribute("class", "semesterHeading");
			heading.innerHTML = sems[j].name;
			semester.appendChild(heading);


			// decide if the semester is history
			var semTerm = sems[j].term;
			var semYear = sems[j].year;

			var currSem = plan.currSemester;
			var currYear = plan.currYear;
			var overlayOn = false;
			if(currYear > semYear || (currYear == semYear && currSem > semTerm)){
				var overlay = document.createElement("div");
				overlay.setAttribute("class", "overlay");
				semester.appendChild(overlay);
				overlayOn = true;
			} else{
				semester.className += " active";
			}

			// create semester content
			var content = document.createElement("div");
			content.setAttribute("class", "semesterContent");

			semester.appendChild(content);

			// loop over every course in the semester
			var courses = sems[j].courses;
			var sumCredits = 0;
			for(var k=0; k<courses.length; k++){

				var course = buildCourse(courses[k].codeDept, courses[k].codeNum, courses[k].name, courses[k].credits, courses[k].id, courses[k].semester_course_ruby);
				
				if(overlayOn){
					course.className += " inactive-course";
				} else{
					course.className += " active-course";
				}
				
				sumCredits += courses[k].credits;
				// add the course to the semester
				content.appendChild(course);
			}

			totalCreds += sumCredits;

			// create semester footer
			var footer = document.createElement("div");
			footer.setAttribute("class", "semesterFooter");
			footer.innerHTML = "CREDITS: " + sumCredits;
			semester.appendChild(footer);
		}
	}

	makeCoursesDraggable();
	makeSemestersDroppable();

	var planHeading = document.getElementById("planHeading");
	planHeading.innerHTML = "ACADEMIC PLAN: " + plan.name + "<br><h5 style='margin:0px'>" + "Major: " + plan.majorName + " - Total Credits: " + totalCreds + "</h5>";

}

function buildCourse(codeDept, codeNum, name, credits, id, semcourse){
	// create the course
	var course = document.createElement("div");

	var dept = getDeptClass(codeDept);
	course.setAttribute("class", "course " + dept);
	course.dataset.semester_course_ruby = semcourse;
	course.style.flexGrow = credits;

	// create the course title
	var title = document.createElement("div");
	title.setAttribute("class", "courseTitle");
	title.innerHTML = name;

	// create the credit field
	var creditDiv = document.createElement("div");
	creditDiv.setAttribute("class", "courseCredits");
	creditDiv.innerHTML = credits;


	// create the code field
	var code = document.createElement("div");
	code.setAttribute("class", "courseCode");
	code.innerHTML = codeDept + "-" + codeNum;

	course.appendChild(title);
	course.appendChild(creditDiv);
	course.appendChild(code);
	
	course.id = id;

	return course;
}

function makeCoursesDraggable(){

	$(".course").draggable({
		revert: true,
		revertDuration: 0,
		stack: ".active-course",
		//helper: 'clone',
		cursorAt: {
			top: 25,
			left: 25
		},
		
	});


	$('.course').mousedown(function(event) {
		switch (event.which) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				if(removeFromPlan($(this)[0])){
					$(this).remove();

					setupRequirements();
				}
				break;
			default:
				break;
		}
	});
}

function makeSemestersDroppable(){

	$(".semester.active").droppable({
		drop: function(event, ui) {
			var a = $(this).find('.semesterContent')[0];

			var b;

			if(ui.draggable[0].classList[0] == 'course') {
				
				if(removeFromPlan(ui.draggable[0])){
					ui.draggable[0].remove();
				} else{
					return;
				}
				
				var code = ui.draggable[0].children[2].innerHTML;
				
				b = buildCourse(code.substring(0,code.length-5), code.substring(code.length-4), ui.draggable[0].children[0].innerHTML, ui.draggable[0].children[1].innerHTML, ui.draggable[0].id, ui.draggable[0].dataset.semester_course_ruby);
				a.append(b);
												
				if(!addToPlan(b, code)){
					b.remove();
					return;
				}
				
			}else if(ui.draggable[0].classList[0] == 'catalog-course'){
				var code = ui.draggable[0].children[0].innerHTML;
				b = buildCourse(code.substring(0,code.length-5), code.substring(code.length-4), ui.draggable[0].children[1].innerHTML, ui.draggable[0].children[2].innerHTML, ui.draggable[0].id, ui.draggable[0].dataset.semester_course_ruby);
				a.append(b);
				
				if(!addToPlan(b, code)){
					b.remove();
					return;
				}
			} else if(ui.draggable[0].classList[0] == 'validator-course'){
				var codeNum = ui.draggable[0].dataset.codeNum;
				var codeDept = ui.draggable[0].dataset.codeDept;
				
				b = buildCourse(codeDept, codeNum, ui.draggable[0].innerHTML, ui.draggable[0].dataset.credits, ui.draggable[0].id, ui.draggable[0].dataset.semester_course_ruby);
				a.append(b);
				
				if(!addToPlan(b, codeDept+"-"+codeNum)){
					b.remove();
					return;
				}				
			}
			setupRequirements();
		}
	});
}


function addToPlan(courseG, code){
	
	var yearId = courseG.parentNode.parentNode.parentNode.id;
	var semId = courseG.parentNode.parentNode.id;	
	var newCourse = {};
	
	newCourse.semester_ruby = parseInt(courseG.parentNode.parentNode.dataset.ruby_id);
	newCourse.name = courseG.children[0].innerHTML;
	newCourse.credits = parseInt(courseG.children[1].innerHTML);
	newCourse.codeDept = code.substring(0,code.length-5);
	newCourse.codeNum = code.substring(code.length-4);
	newCourse.id = parseInt(courseG.id);
	
	var oops = true;
	
	$.ajax({
		type: "POST",
		url: window.location.href + "/add/?sem_id=" + newCourse.semester_ruby + "&course_id=" + newCourse.id,
		success: function(data) {			
			courseG.dataset.semester_course_ruby = parseInt(data);
			newCourse.semester_course_ruby = parseInt(data);
			plan.years[yearId].terms[semId].courses.push(newCourse);
			oops = true;
		},
		fail: function() {
			oops = false;
		},
		async: false		
	});
	
	return oops;
}

function removeFromPlan(courseG){
	var yearId = parseInt(courseG.parentNode.parentNode.parentNode.id);
	var ruby_sem_id = parseInt(courseG.parentNode.parentNode.dataset.ruby_id);
	var semId = parseInt(courseG.parentNode.parentNode.id);	
	
	var arrCourses = [];
	var courses = plan.years[yearId].terms[semId].courses;
	var broken = false;
	
	var oops = true;
	
	for(var i=0; i<courses.length; i++){
		if(!broken && courses[i].id == courseG.id){
			broken = true;
		} else{
			arrCourses.push(courses[i]);
		}
	}
	
	$.ajax({
		type: "POST",
		url: window.location.href + "/remove/?sem_course_id=" + courseG.dataset.semester_course_ruby,
		success: function() {
			plan.years[yearId].terms[semId].courses = arrCourses;
			oops = true;
		},
		fail: function() {
			oops = false;
		},
		async: false		
	});
	
	return oops;
}

// re-displays the plan anytime the window resizes
function resizeWindow(){
	displayPlan2(displaySummer);
}

// toggles the summer semesters on/off
function toggleSummer(object){
	displaySummer = !displaySummer;
	displayPlan2(displaySummer);
}

// function to add a year
function addYear(){
	var newYear = parseInt(plan.years[plan.years.length-1].name)+1;
	
	var returnData = null;
	$.ajax({
		type: "POST",
		url: window.location.href + "/add_year/?year_id=" + newYear,
		success: function(data) {			
			returnData = data;
		},
		fail: function() {
			alert("PROBLEM ADDING YEAR");
		},
		async: false		
	});
	

	var newFa = new semester("FA " + newYear + "", [], SemEnum.FALL, newYear);
	var newSp = new semester("SP " + (newYear+1) + "", [], SemEnum.SPRING, newYear+1);
    var newSu = new semester("SU " + (newYear+1) + "", [], SemEnum.SUMMER, newYear+1);

	newFa.id = parseInt(returnData.one);
	newSp.id = parseInt(returnData.two);
	newSu.id = parseInt(returnData.three);
	
	
	var yearVar = new year("" + (newYear) + "", [newFa, newSp, newSu]);
	plan.years[newYear] = yearVar;

	displayPlan2(displaySummer);
}

// function to remove a year (checks to make sure the year is empty)
function deleteYear(){

	var yearToDelete = plan.years[plan.years.length-1];

	if(checkEmpty(yearToDelete)){
		
		var returnData = null;
		$.ajax({
			type: "POST",
			url: window.location.href + "/remove_year/?year_id=" + yearToDelete.name,
			success: function(data) {			
				plan.years.pop();
				displayPlan2(displaySummer);
			},
			fail: function() {
				alert("PROBLEM REMOVING YEAR");
			},
			async: false		
		});
		
	} else{
		alert("Cannot delete year. Final year is not empty!");
	}
}

function setupRequirements(){		
	var requirements_data = getRequirements();
	populateAccordion(requirements_data.formattedRequirements);

	var active = $('#accordion').accordion('option', 'active');
	
	$('#accordion').accordion("destroy");	
	$("#accordion").accordion({
		heightStyle: "fill",
		collapsible: false,
		active: active
	});	
	
	populateValidator(requirements_data.neededCourses);				
	displayPlan2(displaySummer);	
}


