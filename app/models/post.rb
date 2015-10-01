class Post < ActiveRecord::Base
  belongs_to :series
  has_and_belongs_to_many :categories
end
