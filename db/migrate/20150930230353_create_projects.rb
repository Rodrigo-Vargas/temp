class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.string :title_slug
      t.string :link
      t.text :description
      t.string :skills
      
      t.timestamps null: false
    end

    create_table :categories_projects, id: false do |t|
      t.belongs_to :categorie, index: true
      t.belongs_to :project, index: true
    end

    create_table :images_projects, id: false do |t|
      t.belongs_to :image, index: true
      t.belongs_to :project, index: true
    end
  end
end
