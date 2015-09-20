class SeriesController < ApplicationController
  before_filter :authenticate_user_admin, :only => [:new, :edit, :create, :update, :destroy]

  def index
    @series = Series.all
  end

  def show
    @serie = Series.find_by_title_slug(params[:title_slug])
  end 

  def new
    @serie = Series.new
  end

  def edit
    @serie = Series.find(params[:id])
  end

  def create
    @serie = Series.new(series_params)

    if @serie.save
      redirect_to series_path
    else 
      render 'new'
    end
  end

  def update
    @serie = Series.find(params[:id])

    if @serie.update(series_params)
      redirect_to series_path
    else 
      render 'edit'
    end
  end

  def destroy
    @serie = Series.find(params[:id])
    @serie.destroy
   
    redirect_to series_path
  end

  private 
  def series_params
    params.require(:series).permit(:title, :title_slug, :about)
  end
end
