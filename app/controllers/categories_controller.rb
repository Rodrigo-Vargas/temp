class CategoriesController < ApplicationController
  before_filter :authenticate_user_admin, :only => [:new, :edit, :create, :update, :destroy]

  def index
    @categories = Category.all
  end

  def show
    @category = Category.find_by_title_slug(params[:title_slug])
  
    @posts = @category.posts

    render template: "post/index" 
  end 

  def new
    @category = Category.new
  end

  def edit
    @category = Category.find(params[:id])
  end

  def create
    @category = Category.new(category_params)

    if @category.save
      redirect_to admin_categories_path
    else 
      render 'new'
    end
  end

  def update
    @category = Category.find(params[:id])

    if @category.update(category_params)
      redirect_to admin_categories_path
    else 
      render 'edit'
    end
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy
   
    redirect_to admin_categories_path
  end

  private 
    def category_params
      params.require(:category).permit(:title, :title_slug)
    end
end
