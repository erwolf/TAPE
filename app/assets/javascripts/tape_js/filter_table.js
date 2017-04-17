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
			tr[i].setAttribute("class","even");
		} else{				
			tr[i].setAttribute("class","odd");
		}
	} else{
		tr[i].setAttribute("class", "");
	}
  }
}

function populateFinder(courses){
	
	var finderTable = document.getElementById("finderTableBody");
	
	for(var i=0; i<courses.length; i++){
		var tr = document.createElement("tr");
		tr.setAttribute("title", courses[i].description);
		
		
		var td1 = document.createElement("td");
		td1.setAttribute("class", "name");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		
		td1.innerHTML = courses[i].code;
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
}