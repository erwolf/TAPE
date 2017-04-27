class CreatePlans < ActiveRecord::Migration[5.0]
  def change
    create_table :plans do |t|
      t.string :name
      t.integer :currSemester
      t.integer :catalogYear
      t.string :majorName
      t.integer :currYear
      t.references :user, foreign_key: {on_delete: :cascade}
      t.timestamps
    end
  end
end
