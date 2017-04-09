class TopNavigationItem < ApplicationRecord
  def path
    return '/' + self.locale + self.url
  end
end
