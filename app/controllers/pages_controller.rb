class PagesController < ApplicationController
  layout "page"
  def home
  end

  def resume
    @cards = TimelineCard.where(locale: 'en')
  end

  # Portuguese
  def inicial
    render 'pages/home'
  end

  def curriculo
    @cards = TimelineCard.where(locale: 'pt')
  end
end
