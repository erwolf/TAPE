user1 = User.new
user1.login = "timothyglensmith"
user1.name = "Timothy Smith"
user1.email = "timothyglensmith@cedarville.edu"
user1.password = "password"
user1.password_confirmation = "password"
user1.role = "student"
user1.save!

user2 = User.new
user2.login = "ewolf"
user2.name = "Emily Wolf"
user2.email = "ewolf@cedarville.edu"
user2.password = "password"
user2.password_confirmation = "password"
user2.role = "student"
user2.save!

user3 = User.new
user3.login = "nshinabarger"
user3.name = "Noah Shinabarger"
user3.email = "nshinabarger@cedarville.edu"
user3.password = "password"
user3.password_confirmation = "password"
user3.role = "student"
user3.save!

user4 = User.new
user4.login = "drwhite"
user4.name = "Thomas White"
user4.email = "thomaswhite@cedarville.edu"
user4.password = "password"
user4.password_confirmation = "password"
user4.role = "admin"
user4.save!

user5 = User.new
user5.login = "gallaghd"
user5.name = "Overlord Gallagher"
user5.email = "gallaghd@cedarville.edu"
user5.password = "password"
user5.password_confirmation = "password"
user5.role = "faculty"
user5.save!

Plan.create(user_id:user2.id, name:"Emily's Entirely Spaceless Plan", currYear:2017, currSemester:1, majorName:"Computer Science", catalogYear:2014) #2
Plan.create(user_id:user3.id, name:"Noah's Cool Plan", currYear:2017, currSemester:1, majorName:"Computer Science", catalogYear:2014) #3

Year.create(year:2016,plan_id:1) #1
Year.create(year:2017,plan_id:1) #2
Year.create(year:2018,plan_id:1) #3
Year.create(year:2019,plan_id:1) #4

Year.create(year:2016,plan_id:2) #5
Year.create(year:2017,plan_id:2) #6
Year.create(year:2018,plan_id:2) #7
Year.create(year:2019,plan_id:2) #8

Semester.create(term:0,year_id:1,plan_id:1) #1
Semester.create(term:1,year_id:1,plan_id:1) #2
Semester.create(term:2,year_id:1,plan_id:1) #3
Semester.create(term:0,year_id:2,plan_id:1) #4
Semester.create(term:1,year_id:2,plan_id:1) #5
Semester.create(term:2,year_id:2,plan_id:1) #6
Semester.create(term:0,year_id:3,plan_id:1) #7
Semester.create(term:1,year_id:3,plan_id:1) #8
Semester.create(term:2,year_id:3,plan_id:1) #9
Semester.create(term:0,year_id:4,plan_id:1) #10
Semester.create(term:1,year_id:4,plan_id:1) #11
Semester.create(term:2,year_id:4,plan_id:1) #12

Semester.create(term:0,year_id:5,plan_id:2) #13
Semester.create(term:1,year_id:5,plan_id:2) #14
Semester.create(term:2,year_id:5,plan_id:2) #15
Semester.create(term:0,year_id:6,plan_id:2) #16
Semester.create(term:1,year_id:6,plan_id:2) #17
Semester.create(term:2,year_id:6,plan_id:2) #18
Semester.create(term:0,year_id:7,plan_id:2) #19
Semester.create(term:1,year_id:7,plan_id:2) #20
Semester.create(term:2,year_id:7,plan_id:2) #21
Semester.create(term:0,year_id:8,plan_id:2) #22
Semester.create(term:1,year_id:8,plan_id:2) #23
Semester.create(term:2,year_id:8,plan_id:2) #24

RequirementCategory.create(name:'Computer Science Major Track') #1
RequirementCategory.create(name:'Required Cognates') #2
RequirementCategory.create(name:'Computer Science Electives') #3
RequirementCategory.create(name:'General Education') #4

Course.create(codeDept:"CS",codeNum:"1210",name:"C++ Programming",description:"This course is SO easy!",credits:2) #1
Course.create(codeDept:"CS",codeNum:"1220",name:"Object-Oriented Design",description:"What's an object? What's the object of this course",credits:3) #2
Course.create(codeDept:"CS",codeNum:"2210",name:"Java",description:"Man, isn't Java SOOOO much better than C++?",credits:3) #3
Course.create(codeDept:"CS",codeNum:"3310",name:"O\/S",description:"Everyone gets an A??? Yeah, everyone gets a migraine!",credits:3) #4
Course.create(codeDept:"MATH",codeNum:"1710",name:"Calculus 1",description:"God speaks in no better way than through calculus",credits:5) #5
Course.create(codeDept:"CS",codeNum:"3410",name:"Algorithms",description:"Did Al Gore really create the internet??",credits:3) #6
Course.create(codeDept:"CS",codeNum:"3510",name:"Compiler",description:"Best course at Cedarville. End of story.",credits:3) #7
Course.create(codeDept:"CS",codeNum:"3610",name:"Database",description:"I hope I never hear of Hibernate again!",credits:3) #8
Course.create(codeDept:"CS",codeNum:"4410",name:"Parallel Computing",description:"If you think C++ is bad, try plain C!",credits:3) #9
Course.create(codeDept:"CS",codeNum:"4710",name:"Computer Graphics",description:"Why do monkeys need engines?",credits:3) #10
Course.create(codeDept:"CS",codeNum:"4810",name:"Software Engr I",description:"Hey, a real project!",credits:3) #11
Course.create(codeDept:"CS",codeNum:"4820",name:"Software Engr II",description:"OK, enough of the real project!",credits:4) #12
Course.create(codeDept:"EGCP",codeNum:"1010",name:"Digital Logic Design",description:"Dr. Kohl is a nice guy!",credits:3) #13
Course.create(codeDept:"EGCP",codeNum:"3210",name:"Computer Architecture",description:"Love pipelining! Love Booth's algorithm!",credits:3) #14
Course.create(codeDept:"BTGE",codeNum:"1720",name:"Spiritual Formations",description:"YAY BIBLE!",credits:3) #15
Course.create(codeDept:"PHYS",codeNum:"2110",name:"Physics I",description:"Dr. Gollmer is tall!",credits:4) #16
Course.create(codeDept:"PHYS",codeNum:"2120",name:"Physics II",description:"Dr. Gollmer got taller!",credits:4) #17
Course.create(codeDept:"CS",codeNum:"3350",name:"Foundations of Computer Security",description:"Yay RSA!",credits:3) #18
Course.create(codeDept:"MATH",codeNum:"2510",name:"Discrete Math",description:"Prob & Stats, only worse!",credits:3) #19
Course.create(codeDept:"EGCP",codeNum:"4310",name:"Computer Networks",description:"If this class was any more boring it would be Web Apps",credits:3) #20
Course.create(codeDept:"EGGN",codeNum:"3110",name:"Professional Ethics",description:"The class where you learn to get the job you should already have",credits:3) #22
Course.create(codeDept:"CS",codeNum:"3220",name:"Web Applications",description:"The most boring class on the planet",credits:3) #22

Requirement.create(course_id:1, requirementcategory_id:1)
Requirement.create(course_id:2, requirementcategory_id:1)
Requirement.create(course_id:3, requirementcategory_id:1)
Requirement.create(course_id:4, requirementcategory_id:1)
Requirement.create(course_id:5, requirementcategory_id:2)
Requirement.create(course_id:6, requirementcategory_id:1)
Requirement.create(course_id:7, requirementcategory_id:1)
Requirement.create(course_id:8, requirementcategory_id:1)
Requirement.create(course_id:9, requirementcategory_id:3)
Requirement.create(course_id:10, requirementcategory_id:3)
Requirement.create(course_id:11, requirementcategory_id:1)
Requirement.create(course_id:12, requirementcategory_id:1)
Requirement.create(course_id:13, requirementcategory_id:2)
Requirement.create(course_id:14, requirementcategory_id:1)
Requirement.create(course_id:15, requirementcategory_id:4)
Requirement.create(course_id:16, requirementcategory_id:2)
Requirement.create(course_id:17, requirementcategory_id:2)
Requirement.create(course_id:18, requirementcategory_id:1)
Requirement.create(course_id:19, requirementcategory_id:2)
Requirement.create(course_id:20, requirementcategory_id:1)
Requirement.create(course_id:21, requirementcategory_id:4)
Requirement.create(course_id:22, requirementcategory_id:1)


SemesterCourse.create(semester_id:1,course_id:1, plan_id:1)
SemesterCourse.create(semester_id:1,course_id:12, plan_id:1)
SemesterCourse.create(semester_id:2,course_id:5, plan_id:1)
SemesterCourse.create(semester_id:2,course_id:2, plan_id:1)
SemesterCourse.create(semester_id:2,course_id:14, plan_id:1)
SemesterCourse.create(semester_id:2,course_id:15, plan_id:1)

SemesterCourse.create(semester_id:4,course_id:3, plan_id:1)
SemesterCourse.create(semester_id:4,course_id:16, plan_id:1)
SemesterCourse.create(semester_id:5,course_id:4, plan_id:1)
SemesterCourse.create(semester_id:5,course_id:17, plan_id:1)
SemesterCourse.create(semester_id:5,course_id:18, plan_id:1)
SemesterCourse.create(semester_id:5,course_id:13, plan_id:1)

SemesterCourse.create(semester_id:7,course_id:6, plan_id:1)
SemesterCourse.create(semester_id:7,course_id:19, plan_id:1)
SemesterCourse.create(semester_id:8,course_id:8, plan_id:1)
SemesterCourse.create(semester_id:8,course_id:21, plan_id:1)

SemesterCourse.create(semester_id:10,course_id:10, plan_id:1)
SemesterCourse.create(semester_id:10,course_id:11, plan_id:1)
SemesterCourse.create(semester_id:11,course_id:20, plan_id:1)
SemesterCourse.create(semester_id:11,course_id:7, plan_id:1)

SemesterCourse.create(semester_id:13,course_id:1, plan_id:2)
SemesterCourse.create(semester_id:13,course_id:12, plan_id:2)
SemesterCourse.create(semester_id:14,course_id:5, plan_id:2)
SemesterCourse.create(semester_id:14,course_id:2, plan_id:2)
SemesterCourse.create(semester_id:14,course_id:14, plan_id:2)
SemesterCourse.create(semester_id:14,course_id:15, plan_id:2)

SemesterCourse.create(semester_id:16,course_id:3, plan_id:2)
SemesterCourse.create(semester_id:16,course_id:16, plan_id:2)
SemesterCourse.create(semester_id:17,course_id:4, plan_id:2)
SemesterCourse.create(semester_id:17,course_id:17, plan_id:2)
SemesterCourse.create(semester_id:17,course_id:18, plan_id:2)
SemesterCourse.create(semester_id:17,course_id:13, plan_id:2)

SemesterCourse.create(semester_id:19,course_id:6, plan_id:2)
SemesterCourse.create(semester_id:19,course_id:19, plan_id:2)
SemesterCourse.create(semester_id:20,course_id:8, plan_id:2)
SemesterCourse.create(semester_id:20,course_id:21, plan_id:2)

SemesterCourse.create(semester_id:22,course_id:10, plan_id:2)
SemesterCourse.create(semester_id:22,course_id:11, plan_id:2)
SemesterCourse.create(semester_id:23,course_id:20, plan_id:2)
SemesterCourse.create(semester_id:23,course_id:7, plan_id:2)
