class PagesController < ApplicationController
  layout "page"
  def home
        
  end

  def resume

  end

  def curriculo
    @cards = TimelineCard.all
  end
end
