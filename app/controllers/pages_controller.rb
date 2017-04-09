class PagesController < ApplicationController
  layout "page"
  def home
  end

  def resume
  end

  # Portuguese
  def inicial
    render 'pages/home'
  end

  def curriculo
    @cards = TimelineCard.all
  end
end
