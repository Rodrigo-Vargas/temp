class CreateSeries < ActiveRecord::Migration
  def change
    create_table :series do |t|
      t.string :title
      t.string :title_slug
      t.text :about
      t.timestamps null: false
    end
  end
end
