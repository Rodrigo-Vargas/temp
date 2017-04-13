class PagesController < ApplicationController
  layout "page"
  def home
  end

  def resume
    @cards = Card.all
    #@cards = TimelineCard.where(locale: 'pt')

    #@cards = TimelineCard.where(locale: 'en')
  end

  # Portuguese
  def inicial
    render 'pages/home'
  end

  def curriculo
    #@cards = Card.all
    #@cards = Card.where(locale: 'pt')
    @cards = Card.where(locale: 'pt')
  end
end
