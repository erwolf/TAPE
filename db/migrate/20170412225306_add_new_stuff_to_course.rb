class AddNewStuffToCourse < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :credits, :integer
    add_column :courses, :codeDept, :string
    add_column :courses, :codeNum, :integer
  end
end
