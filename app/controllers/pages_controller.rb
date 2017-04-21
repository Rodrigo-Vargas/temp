class PagesController < ApplicationController
  layout "page"
  def home
  end

  def resume
    @cards = Card.all
  end

  # Portuguese
  def inicial
    render 'pages/home'
  end

  def curriculo
    @cards = Card.all
    render 'pages/resume'
  end
end
