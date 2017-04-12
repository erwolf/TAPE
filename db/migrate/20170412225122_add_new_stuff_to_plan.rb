class AddNewStuffToPlan < ActiveRecord::Migration[5.0]
  def change
    add_column :plans, :catalogYear, :integer
    add_column :plans, :currYear, :integer
    add_column :plans, :currSemester, :integer
    add_column :plans, :majorName, :string
  end
end
