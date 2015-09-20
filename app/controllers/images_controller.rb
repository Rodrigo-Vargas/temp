class ImagesController < ApplicationController
  before_filter :authenticate_user_admin, :only => [:new, :edit, :create, :destroy]

  def show
    @image = Image.find(params[:id])
  end

  def new
    @image = Image.new;
  end

  def create
    filename = params[:image][:path].original_filename

    filename = Date.current().to_time.to_i.to_s + filename

    path = File.join(Rails.root, "public/images", filename)
    
    File.open(path, "wb") do |f| 
      f.write(params[:image][:path].read)
    end

    @image = Image.new(path: path)

    if @image.save
      redirect_to admin_images_path
    else 
      render 'new'
    end
  end

  def destroy
    @image = Image.find(params[:id])
    File.delete(@image.path)
    @image.destroy
   
    redirect_to admin_images_path
  end

  private 
  def image_params
    params.require(:image).permit(:path)
  end
end
