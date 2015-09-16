class ImagesController < ApplicationController
  before_filter :authenticate_user_admin, :only => [:new, :edit, :create, :destroy]

  def show
    @image = Image.find(params[:id])
  end

  def new
    @image = Image.new;
  end

  def create
    path = File.join(Rails.root, "public/images", params[:image][:path].original_filename)
    
    File.open(path, "wb") do |f| 
      f.write(params[:image][:path].read)
    end

    @image = Image.new(path: path)

    if @image.save
      redirect_to images_path
    else 
      render 'new'
    end
  end

  def destroy
    @image = Image.find(params[:id])
    File.delete(@image.path)
    @image.destroy
   
    redirect_to images_path
  end

  private 
  def image_params
    params.require(:image).permit(:path)
  end
end
