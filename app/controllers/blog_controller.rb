class BlogController < ApplicationController
  layout "page"
  def show
    data = get_file params[:slug]    

    @post = ::FSRecord.new data    
  end

  def get_file(file_name)
    files = Dir.glob("#{Rails.root}/content/blog/*")

    meta_data = ''
    data = ''

    files.each do | file |
      data = '';
      
      if (file == "/vagrant/rodrigovargas.me/content/blog/" + file_name + ".md")
        data = File.read(file)
        break
      else
        continue
      end
    end

    return data
  end
end
