class CreateRequirements < ActiveRecord::Migration[5.0]
  def change
    create_table :requirements do |t|
      t.references :course, foreign_key: true
      t.references :requirementcategory, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
