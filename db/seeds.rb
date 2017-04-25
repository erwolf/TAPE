# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.new
user1.login = "joe"
user1.email = "joe@cedarville.edu"
user1.password = "password"
user1.password_confirmation = "password"
user1.save!

user2 = User.new
user2.login = "pete"
user2.email = "pete@cedarville.edu"
user2.password = "password"
user2.password_confirmation = "password"
user2.save!

Plan.create(user_id:user1.id, name:"myPlan", currYear:2017, currSemester:1, majorName:"Computer Science", catalogYear:2014) #1
Plan.create(user_id:user2.id, name:"Plan 2", currYear:2017, currSemester:1, majorName:"Computer Science", catalogYear:2014) #2
Plan.create(user_id:user1.id, name:"The Super Duper Cool Plan", currYear:2017, currSemester:1, majorName:"Computer Science", catalogYear:2014) #3

Year.create(year:2016,plan_id:1) #1
Year.create(year:2017,plan_id:1) #2
Year.create(year:2018,plan_id:1) #3
Year.create(year:2019,plan_id:1) #4

Year.create(year:2016,plan_id:3) #5
Year.create(year:2017,plan_id:3) #6
Year.create(year:2018,plan_id:3) #7
Year.create(year:2019,plan_id:3) #8


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

Semester.create(term:0,year_id:5,plan_id:3) #13
Semester.create(term:1,year_id:5,plan_id:3) #14
Semester.create(term:2,year_id:5,plan_id:3) #15
Semester.create(term:0,year_id:6,plan_id:3) #16
Semester.create(term:1,year_id:6,plan_id:3) #17
Semester.create(term:2,year_id:6,plan_id:3) #18
Semester.create(term:0,year_id:7,plan_id:3) #19
Semester.create(term:1,year_id:7,plan_id:3) #20
Semester.create(term:2,year_id:7,plan_id:3) #21
Semester.create(term:0,year_id:8,plan_id:3) #22
Semester.create(term:1,year_id:8,plan_id:3) #23
Semester.create(term:2,year_id:8,plan_id:3) #24

Course.create(codeDept:"CS",codeNum:"1210",name:"C++ Programming",description:"This course is SO easy!",credits:2) #1
Course.create(codeDept:"CS",codeNum:"1220",name:"Object-Oriented Design",description:"What's an object? What's the object of this course",credits:3) #2
Course.create(codeDept:"CS",codeNum:"2210",name:"Java",description:"Man, isn't Java SOOOO much better than C++?",credits:3) #3
Course.create(codeDept:"CS",codeNum:"3310",name:"O\/S",description:"Everyone gets an A??? Yeah, everyone gets a migraine!",credits:3) #4
Course.create(codeDept:"MATH",codeNum:"1710",name:"Calculus 1",description:"God speaks in no better way than through calculus",credits:5) #5
Course.create(codeDept:"CS",codeNum:"3410",name:"Algorithms",description:"Did Al Gore really create the internet??",credits:3) #6
Course.create(codeDept:"CS",codeNum:"3510",name:"Compiler",description:"Best course at Cedarville. End of story.",credits:3) #7
Course.create(codeDept:"CS",codeNum:"3610",name:"Database",description:"I hope I never hear of Hibernate again!",credits:3) #8
Course.create(codeDept:"CS",codeNum:"4410",name:"Parallel Computing",description:"If you think C++ is bad, try plain C!",credits:3) #9
Course.create(codeDept:"CS",codeNum:"4710",name:"Computer Graphics",description:"Why do monkeys need engines?",credits:3) #9
Course.create(codeDept:"CS",codeNum:"4810",name:"Software Engr I",description:"Hey, a real project!",credits:3) #10
Course.create(codeDept:"CS",codeNum:"4820",name:"Software Engr II",description:"OK, enough of the real project!",credits:4) #11
Course.create(codeDept:"EGCP",codeNum:"1010",name:"Digital Logic Design",description:"Dr. Kohl is a nice guy!",credits:3) #12
Course.create(codeDept:"EGCP",codeNum:"3210",name:"Computer Architecture",description:"Love pipelining! Love Booth's algorithm!",credits:3) #13
Course.create(codeDept:"BTGE",codeNum:"1720",name:"Spiritual Formations",description:"YAY BIBLE!",credits:3) #14
Course.create(codeDept:"PHYS",codeNum:"2110",name:"Physics I",description:"Dr. Gollmer is tall!",credits:4) #15
Course.create(codeDept:"PHYS",codeNum:"2120",name:"Physics II",description:"Dr. Gollmer got taller!",credits:4) #16
Course.create(codeDept:"CS",codeNum:"3350",name:"Foundations of Computer Security",description:"Yay RSA!",credits:3) #17
Course.create(codeDept:"MATH",codeNum:"2510",name:"Discrete Math",description:"Prob & Stats, only worse!",credits:3) #18
Course.create(codeDept:"EGCP",codeNum:"4310",name:"Computer Networks",description:"If this class was any more boring it would be Web Apps",credits:3) #19
Course.create(codeDept:"EGGN",codeNum:"3110",name:"Professional Ethics",description:"The class where you learn to get the job you should already have",credits:3) #20
Course.create(codeDept:"CS",codeNum:"3220",name:"Web Applications",description:"The most boring class on the planet",credits:3) #21

SemesterCourse.create(semester_id:1,course_id:1)
SemesterCourse.create(semester_id:1,course_id:12)
SemesterCourse.create(semester_id:2,course_id:5)
SemesterCourse.create(semester_id:2,course_id:2)
SemesterCourse.create(semester_id:2,course_id:14)
SemesterCourse.create(semester_id:2,course_id:15)

SemesterCourse.create(semester_id:4,course_id:3)
SemesterCourse.create(semester_id:4,course_id:16)
SemesterCourse.create(semester_id:5,course_id:4)
SemesterCourse.create(semester_id:5,course_id:17)
SemesterCourse.create(semester_id:5,course_id:18)
SemesterCourse.create(semester_id:5,course_id:13)

SemesterCourse.create(semester_id:7,course_id:6)
SemesterCourse.create(semester_id:7,course_id:19)
SemesterCourse.create(semester_id:8,course_id:8)
SemesterCourse.create(semester_id:8,course_id:21)

SemesterCourse.create(semester_id:10,course_id:10)
SemesterCourse.create(semester_id:10,course_id:11)
SemesterCourse.create(semester_id:11,course_id:20)
SemesterCourse.create(semester_id:11,course_id:7)

SemesterCourse.create(semester_id:13,course_id:1)
SemesterCourse.create(semester_id:13,course_id:12)
SemesterCourse.create(semester_id:14,course_id:5)
SemesterCourse.create(semester_id:14,course_id:2)
SemesterCourse.create(semester_id:14,course_id:14)
SemesterCourse.create(semester_id:14,course_id:15)

SemesterCourse.create(semester_id:16,course_id:3)
SemesterCourse.create(semester_id:16,course_id:16)
SemesterCourse.create(semester_id:17,course_id:4)
SemesterCourse.create(semester_id:17,course_id:17)
SemesterCourse.create(semester_id:17,course_id:18)
SemesterCourse.create(semester_id:17,course_id:13)

SemesterCourse.create(semester_id:19,course_id:6)
SemesterCourse.create(semester_id:19,course_id:19)
SemesterCourse.create(semester_id:20,course_id:8)
SemesterCourse.create(semester_id:20,course_id:21)

SemesterCourse.create(semester_id:22,course_id:10)
SemesterCourse.create(semester_id:22,course_id:11)
SemesterCourse.create(semester_id:23,course_id:20)
SemesterCourse.create(semester_id:23,course_id:7)