class CreateSemesterCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :semester_courses do |t|
      t.references :semester, foreign_key: {on_delete: :cascade}
      t.references :course, foreign_key: {on_delete: :cascade}
	  t.references :plan, foreign_key: {on_delete: :cascade}
      t.timestamps
    end
  end
end
