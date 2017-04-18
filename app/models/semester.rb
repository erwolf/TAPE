class Semester < ApplicationRecord

    belongs_to :plan
    
    has_many :semester_courses
    has_many :courses, through: :semester_courses

end
