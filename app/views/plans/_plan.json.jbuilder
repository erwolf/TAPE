
      formattedPlan = {}
      formattedPlan[:catalogYear] = plan['catalogYear']
      formattedPlan[:currYear] = plan['currYear']
      formattedPlan[:currSemester] = plan['currSemester']
      formattedPlan[:majorName] = plan['majorName']
      formattedPlan[:name] = plan['name']
      formattedPlan[:studentName] = current_user.login
      formattedPlan[:years] = []

      years = Year.where(plan_id: plan['id'])
      years.each { |year|
        
        semesters = Semester.where(plan_id: plan['id'], year_id: year['id']).order(:term)  

        formattedYear = {}
        formattedYear[:name] = year['year']
        formattedYear[:terms] = []

        semesters.each { |semester|

            formattedSemester = {}
            formattedSemester[:term] = semester['term']
            formattedSemester[:year] = year['year']
            formattedSemester[:courses] = []

            sem_courses = SemesterCourse.where(semester_id: semester['id'])
            sem_courses.each { |sem_course|
                course = Course.where(id: sem_course['course_id'])

                formattedCourse = {}
                formattedCourse[:semester] = semester['term']
                formattedCourse[:year] = year['year']
                formattedCourse[:name] = course[0]['name']
                formattedCourse[:credits] = course[0]['credits']
                formattedCourse[:codeNum] = course[0]['codeNum']
                formattedCourse[:codeDept] = course[0]['codeDept']


                formattedSemester[:courses].push(formattedCourse)
        }
        formattedYear[:terms].push(formattedSemester)
    }
    formattedPlan[:years].push(formattedYear)
}


formattedCourses = []

json.plan formattedPlan
json.courses formattedCourses
json.url plan_url(plan, format: :json)
