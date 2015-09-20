class AddSeriesToPost < ActiveRecord::Migration
  def change
    add_reference :posts, :series, index: true, foreign_key: true
    add_column :posts, :series_position, :integer
  end
end
