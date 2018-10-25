class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.references :user, index: true
      t.string :title
      t.string :description
      t.string :status

      t.timestamps
    end
  end
end
