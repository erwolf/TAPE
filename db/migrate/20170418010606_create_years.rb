class CreateYears < ActiveRecord::Migration[5.0]
  def change
    create_table :years do |t|
      t.integer :year
      t.references :plan, foreign_key: {on_delete: :cascade}
      t.timestamps
    end
  end
end
