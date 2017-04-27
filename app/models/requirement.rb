class Requirement < ApplicationRecord
  belongs_to :course
  belongs_to :requirementcategory
end
