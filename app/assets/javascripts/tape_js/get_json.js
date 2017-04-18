/* 	temp_plan.js

	Provides the JavaScript for the temporary plan object that we will be rebuilding with better features in the next projects.

	TAPE Website
	Noah Shinabarger, Timothy Smith, Emily Wolf
	Project #3
	February 14th, 2017 */

/*
var courses = [new course(SemEnum.FALL, 2014, "EGCP", 1010, "Digital Logic Design", 3),
                new course(SemEnum.FALL, 2014, "MATH", 1710, "Calculus I", 5),
                new course(SemEnum.FALL, 2014, "CS", 1210, "C++ Programming", 2),
                new course(SemEnum.FALL, 2014, "GSS", 1100, "Politics & American Culture", 3),
                new course(SemEnum.FALL, 2015, "COMM", 1100, "Fundamentals of Speech", 3),
                new course(SemEnum.FALL, 2015, "PFMU", 3820, "Men's Glee Club", 1),
                new course(SemEnum.SPRING, 2015, "BTGE", 1720, "Spiritual Formation", 3),
                new course(SemEnum.SPRING, 2015, "CS", 1220, "Obj-Oriented Design/C++", 3),
                new course(SemEnum.SPRING, 2015, "MATH", 1720, "Calculus II", 5),
                new course(SemEnum.SPRING, 2015, "PHYS", 2110, "General Physics I", 4),
                new course(SemEnum.SPRING, 2015, "PFMU", 3820, "Men's Glee Club", 1),
                new course(SemEnum.FALL, 2015, "BTGE", 2730, "Old Testament Literature", 3),
                new course(SemEnum.FALL, 2015, "CS", 2110, "Data Structures Using Java", 3),
                new course(SemEnum.FALL, 2015, "MATH", 3310, "Prob & Statistics I", 3),
                new course(SemEnum.FALL, 2015, "PHYS", 2120, "General Physics II", 4),
                new course(SemEnum.FALL, 2015, "ENG", 1400, "Composition", 3),
                new course(SemEnum.FALL, 2015, "PFMU", 3820, "Men's Glee Club", 1),
                new course(SemEnum.SPRING, 2016, "BTGE", 2740, "New Testament Literature", 3),
                new course(SemEnum.SPRING, 2016, "EGCP", 3210, "Computer Architecture", 3),
                new course(SemEnum.SPRING, 2016, "MATH", 2510, "Discrete Math - Computer Science", 3),
                new course(SemEnum.SPRING, 2016, "CS", 3310, "Operating Systems", 3),
                new course(SemEnum.SPRING, 2016, "CS", 3350, "Foundations of Computer Security", 3),
                new course(SemEnum.SPRING, 2016, "PEF", 1990, "Physical Activity & The Christian Life", 2),
                new course(SemEnum.SPRING, 2016, "PFMU", 3820, "Men's Glee Club", 0),
                new course(SemEnum.FALL, 2016, "HUM", 1400, "Introduction to the Humanities", 3),
				new course(SemEnum.FALL, 2016, "EGCP", 4310, "Computer Networks", 3),
				new course(SemEnum.FALL, 2016, "CS", 3410, "Algorithms", 3),
				new course(SemEnum.FALL, 2016, "CS" , 3320, "Linux Systems Programming", 3),
				new course(SemEnum.FALL, 2016, "CHEM" , 1050, "Chemistry for Engineers", 3.5),
				new course(SemEnum.FALL, 2016, "PFMU" , 3820, "Men's Glee Club", 1),
                new course(SemEnum.SPRING, 2017, "BEGE" , 3755, "Theology I", 3),
				new course(SemEnum.SPRING, 2017, "CS" , 3220, "Web Applications", 3),
				new course(SemEnum.SPRING, 2017, "CS" , 3610, "Database Organization & Design", 3),
				new course(SemEnum.SPRING, 2017, "CS" , 4310, "Cyber Defense", 3),
				new course(SemEnum.SPRING, 2017, "CS" , 3510, "Compiler Theory & Practice", 3),
				new course(SemEnum.SPRING, 2017, "PFMU" , 3820, "Men's Glee Club", 1),
                new course(SemEnum.FALL, 2017, "BEGE" , 3765, "Theology II", 3),
				new course(SemEnum.FALL, 2017, "CS" , 4810, "Software Engineering I", 3),
			    new course(SemEnum.FALL, 2017, "CS" , 4330, "Software Security", 3),
				new course(SemEnum.FALL, 2017, "EGGN" , 4010, "Senior Seminar", 0),
				new course(SemEnum.FALL, 2017, "GBIO" , 1000, "Principles of Biology", 3.5),
				new course(SemEnum.FALL, 2017, "LIT" , 2300, "Introduction to Literature", 3),
				new course(SemEnum.FALL, 2017, "PFMU" , 3820, "Men's Glee Club", 1),
                new course(SemEnum.SPRING, 2018, "EGGN" , 3110, "Professional Ethics", 3),
				new course(SemEnum.SPRING, 2018, "CS" , 4820, "Software Engineering II", 4),
				new course(SemEnum.SPRING, 2018, "HIST" , 1120, "United States History II", 3),
				new course(SemEnum.SPRING, 2018, "PYCH" , 1600, "General Psychology", 3),
				new course(SemEnum.SPRING, 2018, "PFMU" , 3820, "Men's Glee Club", 1)];
*/

jQuery.extend({
	getData: function() {
		var result = null;
		$.ajax({
			type: 'GET',
			url: window.location.href + '.json',
			dataType: 'json',
			async: false,
			success: function(data) {
				result = data;
			}
		});
		return result;
	}
});
/*
jQuery.extend({
	getData_Courses: function() {
		var result = null;
		$.ajax({
			type: 'GET',
			url: 'http://judah.cedarville.edu/~gallaghd/cs3220/termProject/getCourseList.php',
			dataType: 'json',
			async: false,
			success: function(data) {
				result = data;
				var formattedCourses = formatCourses_forFinder(data);

				populateFinder(formattedCourses);
			}
		});
		return result;
	}
});
*/

function printData(data){
	console.log(data);
}

function formatCourses(data){
	var courses = [];
	// credits, id, name, term, year
	// into
	// semester, year, codeDept, codeNum; name, credits

	for(var c in data){

		if(!data.hasOwnProperty(c)) continue;

		var tempCourse = data[c];

		var sem = getSemFromString(tempCourse.term);
		var year = tempCourse.year;

		var name = tempCourse.name;
		var credits = tempCourse.credits;

		var parts = tempCourse.id.split('-');

		var codeDept = parts[0];
		var codeNum = parts[1];

		var newCourse = new course(sem, year, codeDept, codeNum, name, credits);
		courses.push(newCourse);
	}

	return courses;
}

function formatCourses_forFinder(data){
	var courses = [];

	for(var c in data){

		var tempCourse = data[c];

		var code = tempCourse.number;
		var name = tempCourse.name;
		var desc = tempCourse.description;
		var cred = tempCourse.credits;

		var newCourse = new finderCourse(code, name, desc, cred);
		courses.push(newCourse);
	}

	return courses;
}

