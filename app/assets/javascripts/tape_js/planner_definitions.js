/* 	planner_definitions.js
	
	Provides the JavaScript for all objects/classes/hashes used to create a plan
	
	TAPE Website
	Noah Shinabarger, Timothy Smith, Emily Wolf
	Project #2
	February 14th, 2017 */

function plan(nm, year, major, student, currSem, currYear, yrs) {	
	this.name = nm;
	this.catalogYear = year;
	this.majorName = major;
	this.studentName = student;
	this.currSemester = currSem;
	this.currYear = currYear;
	this.years = yrs;
};

function course(trm, yr, cd, cn, nm, cred){
	this.semester = trm;
	this.year = yr;
	this.codeDept = cd;
	this.codeNum = cn;
	this.name = nm;
	this.credits = cred;
};

function finderCourse(cd, nm, desc, cred){
	this.code = cd;
	this.name = nm;
	this.description = desc;
	this.credits = cred;	
};

function year(nm, trms){
	this.name = nm;
	this.terms = trms;
};

function semester(nm, crs, tm, yr){
	this.name = nm;
	this.courses = crs;
	
	// term is a SemEnum value
	this.term = tm;
	this.year = yr;
};

var SemEnum = {FALL:2, SPRING:0, SUMMER:1};

// tells us whether a year is empty or not
function checkEmpty(year){
	var terms = year.terms;

	for(var i=0; i<terms.length; i++){
		if(terms[i].courses.length != 0){
			return false;
		}		
	}	
	return true;
}

function buildPlan(name, catalogYear, major, student, courses, currSem, currYear){

	var totSem = getSemFromString(currSem);
	var totYear = currYear;

    years = [];

    for(var i=0; i<courses.length; i++){
        var currSem = courses[i].semester;
        var currYear = courses[i].year;
        
        if(currSem != SemEnum.FALL) currYear--;

        if(years[currYear] == null){

            var newFA = new semester("FA " + currYear, [], SemEnum.FALL, currYear);
            var newSP = new semester("SP " + (currYear+1), [], SemEnum.SPRING, currYear+1);
            var newSU = new semester("SU " + (currYear+1), [], SemEnum.SUMMER, currYear+1);

            var newYear = new year("" + currYear + "", [newFA, newSP, newSU]);
            years[currYear] = newYear;
        }

        years[currYear].terms[getSemIndex(currSem)].courses.push(courses[i]);
    }
    var newPlan = new plan(name, catalogYear, major, student, totSem, totYear, years);

    return newPlan;
}

function getSemFromString(str){
	switch(str.toLowerCase()){
		case "spring":
			return SemEnum.SPRING;
		case "fall":
			return SemEnum.FALL;
		case "summer":
			return SemEnum.SUMMER;
	};	
}

function getSemIndex(sem){
		switch(sem){
		case SemEnum.SPRING:
			return 1;
		case SemEnum.FALL:
			return 0;
		case SemEnum.SUMMER:
			return 2;
	};
	
}

// returns the department css class name
function getDeptClass(classCode){
	
	var deptName = getDeptName(classCode);
	
	switch(deptName){
		case "AD":
		case "AT":
			return "art";
		case "BA":
			return "business";
		case "BE":
		case "BI":
		case "CE":
			return "bible";
		case "CA":
		case "CM":
			return "comm";
		case "ED":
			return "education";
		case "EG":
			return "engineering";
		case "HG":
			return "history";
		case "ID":
			return "interdisciplinary";
		case "ES":
		case "KH":
			return "allied-health";
		case "LL":
			return "lang";
		case "MS":
		case "MU":
			return "music";
		case "NS":
			return "nursing";
		case "PH":
			return "pharm";
		case "PY":
			return "psych";
		case "SM":
			return "math";
		case "SW":	
			return "socialwork";
		default:
			return "misc";
	}
	
	return "";
}

// returns the two letter department code
function getDeptName(classCode){
	switch(classCode){
		case "ART":
		case "GDES":
		case "IDES":
		case "THTR":
		case "VCD":
			return "AD";
			
		case "ATRN":
			return "AT";
			
		case "ACCT":		
		case "BA":
		case "BUS":
		case "ECON":
		case "EUIS":
		case "FIN":
		case "ITM":
		case "MGMT":
		case "MIS":
		case "MRKT":
		case "SMGT":
			return "BA";
			
		case "BE":
		case "BEBL":
		case "BECE":
		case "BEGE":
		case "BEGS":
		case "BENT":
		case "BEOT":
		case "BEPH":
		case "BEPT":
		case "BEST":
		case "BETH":
			return "BE";
			
		case "BEBS":
		case "BEDU":
		case "BEHI":
		case "BTAT":
		case "BTBL":
		case "BTBS":
		case "BTCM":
		case "BTGE":
		case "BTGS":
		case "BTHT":
		case "BTNT":
		case "BTOT":
		case "BTPA":
		case "XBGE":
		case "XBHI":
		case "EGGN":
			return "BI";
		
		case "CA":
		case "COM":
		case "COMM":
		case "EMTC":
		case "JOUR":
			return "CA";
			
		case "CEBE":
		case "CEEE":
		case "CEEM":
		case "CELG":
		case "CENS":
			return "CE";
			
		case "BRDM":
		case "DCCM":
		case "PWID":
		case "TPC":
			return "CM";
		
		case "ECS":
		case "ECSP":
		case "ED":
		case "EDA":
		case "EDEC":
		case "EDMC":
		case "EDR":
		case "EDSE":
		case "EDSP":
		case "EDU":
		case "EDUC":
			return "ED";
		
		case "CS":
		case "EG":
		case "EGCP":
		case "EGEE":
		case "EGME":
			return "EG";
		
		case "AT":
		case "CCHG":
		case "ES":
		case "ESS":
		case "ESSE":
		case "EXSC":
		case "MAHE":
		case "MAPE":
		case "PASS":
		case "PEAE":
		case "PEAI":
		case "PEAS":
		case "PEAT":
		case "PEH":
		case "PEM":
		case "SES":
			return "ES";
		
		case "ANTH":
		case "CRJU":
		case "DCHG":
		case "GEO":
		case "GSS":
		case "HIST":
		case "INTL":
		case "POLS":
		case "PUAD":
		case "SOC":
		case "SS":
		case "SSED":
		case "UNIV":
			return "HG";
		
		case "COLL":
		case "GLBL":
		case "HON":
		case "ID":
		case "LART":
			return "ID";
		
		case "ALHL":
		case "DCPF":
		case "ESED":
		case "PEAF":
		case "PEAL":
		case "PEAR":
		case "PEAX":
		case "PEF":
		case "XPEF":
			return "KH";
		
		case "ARBC":
		case "CHN":
		case "DCLT":
		case "EAP":
		case "ENG":
		case "FILM":
		case "FREN":
		case "GER":
		case "LANG":
		case "LING":
		case "LIT":
		case "LL":
		case "SPAN":
			return "LL";
		
		case "AES":
		case "MIL":
			return "MS";
		
		case "CDMU":
		case "CHMU":
		case "CLMU":
		case "DCHU":
		case "EDMU":
		case "GMUS":
		case "HLMU":
		case "HUM":
		case "KPMU":
		case "MU":
		case "MUED":
		case "PFMU":
		case "PLMU":
		case "THMU":
		case "TYMU":
		case "WSHP":
		case "XHUM":
			return "MU";
		
		case "DCNS":
		case "NS":
		case "NSG":
			return "NS";
		
		case "PHAR":
		case "PPHR":
			return "PH";
		
		case "DCPY":
		case "PY":
		case "PYCH":
			return "PY";
		
		case "BIO":
		case "BIOA":
		case "BIOE":
		case "CHEM":
		case "DEV":
		case "ENVS":
		case "ESCI":
		case "FORS":
		case "GBIO":
		case "GEOA":
		case "GEOG":
		case "GEOL":
		case "GMTH":
		case "GSCI":
		case "MATH":
		case "MTED":
		case "PHYS":
		case "SCED":
		case "SM":
		case "XGBI":
			return "SM";
		
		case "SWK":
			return "SW";

		default:
			return "NULL";
	}
}
