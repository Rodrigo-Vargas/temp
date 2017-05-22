class Members::PagesController < Members::BaseController
  def home

  end

  def snippet_detail
    @snippet = WOR::Core.find({ locale: "en", collection: "snippets", page_name: params[:name]})
  end

  def route
    collection = "pages"
    locale = "en"
    page_name = "index"

    if (params[:page_name].present?)
      page_name = params[:page_name]
    end

    if (params[:collection].present?)
      collection = params[:collection]
    end
    
    page = WOR::Core.find(locale: locale,
                          collection: collection, 
                          page_name: page_name)

    if (page.nil?)
      raise ActionController::RoutingError.new('Not Found')
    end

    require 'erb'

    renderer = ERB.new(page.content)
    
   if (page.layout.present?)
      @layout = "layouts/" + page.layout
    end

    render html: renderer.result.html_safe, :layout => @layout
  end
end