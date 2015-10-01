class Project < ActiveRecord::Base
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :images

  def project_image
    if self.images.size > 0
      return self.images[0].server_path
    else
      return '/blablu'
    end
  end
end
