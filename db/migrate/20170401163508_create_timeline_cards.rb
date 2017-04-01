class CreateTimelineCards < ActiveRecord::Migration[5.0]
  def change
    create_table :timeline_cards do |t|
      t.string :name
      t.string :slug_name
      t.date :start_date
      t.date :end_date
      t.string :job_title
      t.integer :lcid
      t.text :body
    end
  end
end
