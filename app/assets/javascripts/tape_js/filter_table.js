// hides all of the rows that do not match the current input string
function filterSearch() {
  var input, filter, table, tr, td, i, shown;
  input = document.getElementById("finderInput");
  filter = input.value.toLowerCase().replace(/-/g,'');
  table = document.getElementById("finderTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
	shown = false;
	var elms = tr[i].getElementsByTagName("td");
	
	for(var j = 0; j < elms.length; j++){
		td = elms[j];
		if (td) {
		  if (td.innerHTML.toLowerCase().replace(/-/g,'').indexOf(filter) > -1 || 
		  td.innerHTML.toLowerCase().replace(/[- ]/g,'').indexOf(filter) > -1 ||
		  td.innerHTML.toLowerCase().replace(/[- ]/g,'').indexOf(filter.replace(/[- ]/g, '')) > -1) {
			tr[i].style.display = "";
			if(!shown) shown = true;
		  }
		}
	}
	
	if(elms.length > 0 && !shown){
		tr[i].style.display = "none";
	}
  }  
  alternateFilter();
};


// makes the background color of the search table alternate
function alternateFilter(){
  var table = document.getElementById("finderTable");
  tr = table.getElementsByTagName("tr");
  var count = 1;
  for (i = 0; i < tr.length; i++) {	
	if(tr[i].style.display != "none"){
		count++;		
		if(count % 2 == 0){
			tr[i].className = "catalog-course even";
		} else{				
			tr[i].className = "catalog-course odd";
		}
	} else{
		tr[i].className = "catalog-course";
	}
  }
}

function populateFinder(courses){
	
	var finderTable = document.getElementById("finderTableBody");
	
	for(var i=0; i<courses.length; i++){
		var tr = document.createElement("tr");
		tr.setAttribute("title", courses[i].description);
		tr.setAttribute("class", "catalog-course");
		tr.setAttribute("id", courses[i].id);
				
		var td1 = document.createElement("td");
		td1.setAttribute("class", "name");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		
		td1.innerHTML = courses[i].codeDept + '-' + courses[i].codeNum;
		td2.innerHTML = courses[i].name;
		td3.innerHTML = courses[i].credits;		
		
		td1.style.textAlign = "left";
		td2.style.textAlign = "left";
		td3.style.textAlign = "center";
		
		td1.style.paddingLeft = "25px";
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		
		finderTable.appendChild(tr);
	}
	alternateFilter();
	
	
	makeTableCoursesDraggable();
}

function populateAccordion(requirements){
	
	var accordion = document.getElementById('accordion');
	
	$('#accordion').empty();
	
	for(var i=0; i<requirements.length; i++){
		
		accordion.innerHTML += "<h3 style='font-weight: bold'>" + requirements[i].name + "</h3>";
		
		var ul = document.createElement('ul');
		
		for(var j=0; j<requirements[i].courses.length; j++){
			
			var li = document.createElement('li');
			
			if(requirements[i].courses[j].planned){
				li.style.color = "green";
			} else {
				li.style.color = "red";
			}
			
			li.id = requirements[i].courses[j].id;
			li.innerHTML = requirements[i].courses[j].name;
			
			ul.append(li);
		}
		
		accordion.appendChild(ul);
	}
}

function populateValidator(courses){
	
	var validator = document.getElementById('validatorContent');
	
	$('#validatorContent').empty();
	
	if(courses.length > 0){
		
		var dv = document.createElement('div');
		dv.style.color = "red";
		dv.style.fontWeight = "bold";
		dv.style.padding = "4px";
		dv.style.fontSize = "15pt";
		dv.style.borderBottom = "2pt solid red";
		dv.style.marginBottom = "4px";
		dv.innerHTML = "PROBLEM!<br>You still need to take these courses:";		
		validator.appendChild(dv);	
	
		var ul = document.createElement('ul');
		for(var i=0; i<courses.length; i++){
			
			var li = document.createElement("li");
			li.className = "validator-course";
			li.id = courses[i].id;
			li.dataset.codeDept = courses[i].codeDept;
			li.dataset.codeNum = courses[i].codeNum;
			li.dataset.credits = courses[i].credits;
			li.innerHTML = courses[i].name;

			
			ul.appendChild(li);			
		}
		
		validator.appendChild(ul);
		makeValidatorCoursesDraggable();
		
	} else {		
		var dv = document.createElement('div');
		dv.style.color = "green";
		dv.style.fontWeight = "bold";
		dv.style.padding = "4px";
		dv.style.fontSize = "15pt";
		dv.style.borderBottom = "2pt solid green";
		dv.style.marginBottom = "4px";
		dv.innerHTML = "Your plan meets all the requirements!";
		validator.appendChild(dv);		
	}
}

function makeValidatorCoursesDraggable(){
	
	$('.validator-course').draggable({		
		revert: true,
		revertDuration: 0,
		helper: function() {
				
			var a = $(this);
			var code = a[0].innerHTML;
			var b = buildCourse(a[0].dataset.codeDept, a[0].dataset.codeNum, a[0].innerHTML, a[0].dataset.credits, a[0].id);
			b.style.zIndex = 1000;
			b.style.width = '100px';
			b.style.height = '100px';
			b.style.textAlign = 'center';
			return b;
		},
		scroll: false,
		containment: 'window',
		appendTo: 'body',
		cursorAt: {
			top: 25,
			left: 25
		}
	});
	
}

function makeTableCoursesDraggable(){
	
	$('.catalog-course').draggable({		
		revert: true,
		revertDuration: 0,
		helper: function() {
				
			var a = $(this);
			var code = a[0].children[0].innerHTML;
			var b = buildCourse(code.substring(0,code.length-5), code.substring(code.length-4), a[0].children[1].innerHTML, a[0].children[2].innerHTML);
			b.style.zIndex = 1000;
			b.style.width = '100px';
			b.style.height = '100px';
			b.style.textAlign = 'center';
			return b;
		},
		scroll: false,
		containment: 'window',
		appendTo: 'body',
		cursorAt: {
			top: 5,
			left: 5
		}
	});

}