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

Plan.create(user_id:user1.id, name:"Plan 1", currYear:2017, currSemester:1, majorName:"Computer Science", catalogYear:2014)
Plan.create(user_id:user2.id, name:"Plan 2", currYear:2017, currSemester:1, majorName:"Computer Science", catalogYear:2014)

Year.create(year_id:2020,plan_id:"Plan 1")
Year.create(year_id:2021,plan_id:"Plan 1")
Year.create(year_id:2022,plan_id:"Plan 1")
Year.create(year_id:2023,plan_id:"Plan 1")
Year.create(year_id:2018,plan_id:"Plan 1")
Year.create(year_id:2019,plan_id:"Plan 1")
Year.create(year_id:2017,plan_id:"Plan 1")
Year.create(year_id:2016,plan_id:"Plan 1")
Year.create(year_id:2016,plan_id:"Plan 2")


Semester.create(term:"Spring",year:2021)
Semester.create(term:"Fall",year:2021)
Semester.create(term:"Fall",year:2020)
Semester.create(term:"Spring",year:2022)
Semester.create(term:"Fall",year:2022)
Semester.create(term:"Spring",year:2023)
Semester.create(term:"Fall",year:2023)
Semester.create(term:"Spring",year:2024)

Course.create(name:"Calculus 1", codeDept:"MATH", codeNum:1710, credits:5)
Course.create(name:"Calculus 2", codeDept:"MATH", codeNum:1720, credits:5)
Course.create(name:"C++ Programming", codeDept:"CS", codeNum:1210, credits:2)
Course.create(name:"Object-Oriented Design", codeDept:"CS", codeNum:1220, credits:3)
Course.create(name:"Web Apps", codeDept:"CS", codeNum:3220, credits:3)
Course.create(name:"Introduction to the Humanities", codeDept:"ART", codeNum:7, credits:3)

SemesterCourse.create(semester_id:1,course_id:1)
SemesterCourse.create(semester_id:1,course_id:2)
SemesterCourse.create(semester_id:1,course_id:3)
SemesterCourse.create(semester_id:1,course_id:4)
SemesterCourse.create(semester_id:1,course_id:5)
SemesterCourse.create(semester_id:1,course_id:6)
