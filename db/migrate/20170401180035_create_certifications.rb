class CreateCertifications < ActiveRecord::Migration[5.0]
  def change
    create_table :certifications do |t|
      t.string :name
      t.string :slug
      t.text :description
      t.string :image_url
      t.string :locale
      t.string :reference
      t.text :body
    end
  end
end
