class Plan < ApplicationRecord

  belongs_to(:user)

  has_many :years
  has_many :semesters, through: :years
  has_many :semester_courses, through: :semesters
  has_many :courses, through: :semester_courses
end
