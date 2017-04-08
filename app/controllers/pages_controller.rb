class PagesController < ApplicationController
  layout "page"
  def home
        
  end

  def resume

  end

  # Portuguese

  def inicial

  end

  def curriculo
    @cards = TimelineCard.all
  end
end
