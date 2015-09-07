class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :title_slug
      t.datetime :published_at
      t.text :content
      
      t.timestamps null: false
    end
  end
end
