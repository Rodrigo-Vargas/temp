class Admin::PagesController < Admin::BaseController
  def home
    @cards = TimelineCard.all
    @nav_items = TopNavigationItem.all
  end
end
