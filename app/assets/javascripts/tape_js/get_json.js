/* 	temp_plan.js

	Provides the JavaScript for the temporary plan object that we will be rebuilding with better features in the next projects.

	TAPE Website
	Noah Shinabarger, Timothy Smith, Emily Wolf
	Project #3
	February 14th, 2017 */

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

function getRequirements(){
	
	var returnData = null
	
	$.ajax({
		type: "POST",
		url: window.location.href + "/requirements",
		success: function(data) {
			returnData = data;
		},
		fail: function() {
			returnData = null;
		},
		async: false		
	});
	
	return returnData;
}

function printData(data){
	console.log(data);
}

