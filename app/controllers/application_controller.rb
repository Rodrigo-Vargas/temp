class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_locale
  before_action :get_top_nav
  
  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def get_top_nav
    @nav_items = TopNavigation.where(locale: I18n.locale.to_s).sort_by{ | t | - t.position }
  end
end
