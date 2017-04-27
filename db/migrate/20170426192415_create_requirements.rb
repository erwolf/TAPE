class CreateRequirements < ActiveRecord::Migration[5.0]
  def change
    create_table :requirements do |t|
      t.references :course, foreign_key: true
      t.references :requirementcategory, foreign_key: true

      t.timestamps
    end
  end
end
