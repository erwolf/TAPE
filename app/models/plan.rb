class Plan < ApplicationRecord

  belongs_to(:user)

  has_many :terms
  has_many :term_courses, through: :terms
  has_many :courses, through: :term_courses
end
