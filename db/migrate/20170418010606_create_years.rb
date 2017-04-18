class CreateYears < ActiveRecord::Migration[5.0]
  def change
    create_table :years do |t|
      t.integer :year_id
      t.references :plan, foreign_key: true
      t.timestamps
    end
  end
end
