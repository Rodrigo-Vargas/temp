module ApplicationHelper
  def get_translated_url_of_route route_name, value
    locale = I18n.locale
    route = Rails.application.routes.url_helpers.send("#{locale}_#{route_name}_path")

    return "/#{locale}/#{route}/#{value}"
  end
end
