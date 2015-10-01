class Image < ActiveRecord::Base
  has_and_belongs_to_many :projects

  def server_path
    return self.path.partition("/public").last
  end
end
