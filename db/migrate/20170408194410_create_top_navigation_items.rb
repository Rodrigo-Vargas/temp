class CreateTopNavigationItems < ActiveRecord::Migration[5.0]
  def change
    create_table :top_navigation_items do |t|
      t.string :name
      t.text :url
      t.string :locale
      t.string :reference
      t.string :icon
      t.integer :position

      t.timestamps
    end
  end
end
