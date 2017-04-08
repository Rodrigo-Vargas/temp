class CreateTopNavigationItems < ActiveRecord::Migration[5.0]
  def change
    create_table :top_navigation_items do |t|
      t.string :name
      t.text :url
      t.integer :lcid
      t.string :reference
      t.string :icon

      t.timestamps
    end
  end
end
