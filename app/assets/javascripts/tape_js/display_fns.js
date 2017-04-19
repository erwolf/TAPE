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

	plan = myPlan;

	var planHeading = document.getElementById("planHeading");
	planHeading.innerHTML = "ACADEMIC PLAN: " + plan.name;


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

		planner.appendChild(year);

		// loop over every semester in the year
		var sems = years[i].terms;
		for(var j=0; j<sems.length; j++){

			// create semester
			var semester = document.createElement("div");
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

			if(currYear > semYear || (currYear == semYear && currSem > semTerm)){
				var overlay = document.createElement("div");
				overlay.setAttribute("class", "overlay");
				semester.appendChild(overlay);
			}

			// create semester content
			var content = document.createElement("div");
			content.setAttribute("class", "semesterContent");

			semester.appendChild(content);

			// loop over every course in the semester
			var courses = sems[j].courses;
			var sumCredits = 0;
			for(var k=0; k<courses.length; k++){

				// create the course
				var course = document.createElement("div");

				var dept = getDeptClass(courses[k].codeDept);
				course.setAttribute("class", "course " + dept);

				course.style.flexGrow = courses[k].credits;

				// create the course title
				var title = document.createElement("div");
				title.setAttribute("class", "courseTitle");
				title.innerHTML = courses[k].name;

				// create the credit field
				var credits = document.createElement("div");
				credits.setAttribute("class", "courseCredits");
				credits.innerHTML = courses[k].credits;
				sumCredits += courses[k].credits;

				// create the code field
				var code = document.createElement("div");
				code.setAttribute("class", "courseCode");
				code.innerHTML = courses[k].codeDept + "-" + courses[k].codeNum;

				course.appendChild(title);
				course.appendChild(credits);
				course.appendChild(code);

				// add the course to the semester
				content.appendChild(course);
			}

			// create semester footer
			var footer = document.createElement("div");
			footer.setAttribute("class", "semesterFooter");
			footer.innerHTML = "CREDITS: " + sumCredits;
			semester.appendChild(footer);
		}
	}

	$(".course").draggable({snap: ".semesterContent", snapMode: "inner", revert: true});
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

	var newFa = new semester("FA " + newYear + "", [], SemEnum.FALL, newYear);
	var newSp = new semester("SP " + (newYear+1) + "", [], SemEnum.SPRING, newYear+1);
    var newSu = new semester("SU " + (newYear+1) + "", [], SemEnum.SUMMER, newYear+1);

	var yearVar = new year("" + (newYear) + "", [newFa, newSp, newSu]);
	plan.years[newYear] = yearVar;

	displayPlan2(displaySummer);
}

// function to remove a year (checks to make sure the year is empty)
function deleteYear(){

	var yearToDelete = plan.years[plan.years.length-1];

	if(checkEmpty(yearToDelete)){
		plan.years.pop();
		displayPlan2(displaySummer);
	} else{
		alert("Cannot delete year. Final year is not empty!");
	}
}
