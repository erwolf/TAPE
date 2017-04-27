class CreateSemesters < ActiveRecord::Migration[5.0]
  def change
    create_table :semesters do |t|
      t.integer :term
      t.references :year, foreign_key: {on_delete: :cascade}
      t.references :plan, foreign_key: {on_delete: :cascade}
    end
  end
end
