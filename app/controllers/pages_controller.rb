class PagesController < ApplicationController
  layout "page"
  def home
  end

  def resume
    @cards = Card.where(locale: 'en')    
  end

  # Portuguese
  def inicial
    render 'pages/home'
  end

  def curriculo
    @cards = Card.where(locale: 'pt')
    render 'pages/resume'
  end
end
