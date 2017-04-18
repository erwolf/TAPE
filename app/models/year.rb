class Year < ApplicationRecord

    belongs_to :plan

    has_many :semesters
    has_many :semester_courses, through: :semesters
    has_many :courses, through: :semester_courses




end
