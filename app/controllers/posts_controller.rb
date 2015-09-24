class PostsController < ApplicationController
  before_filter :authenticate_user_admin, :only => [:new, :edit, :create, :update, :destroy]

  def index
    @posts = Post.all.order(published_at: :desc)
  end

  def show
    @post = Post.find_by_title_slug(params[:title_slug])
  end 

  def show_episode
    @post = Post.find_by_title_slug(params[:title_slug_episode])
  end

  def new
    @post = Post.new
  end

  def edit
    @post = Post.find(params[:id])
  end

  def create
    @post = Post.new(post_params)

    params[:categories].each do |k,v|
      if (k != '')
        @post.categories << Category.find(k)
      end
    end

    if @post.save
      redirect_to posts_path
    else 
      render 'new'
    end
  end

  def update
    @post = Post.find(params[:id])
    @post.categories.delete_all

    params[:categories].each do |k,v|
      if (k != '')
        @post.categories << Category.find(k)
      end
    end

    if @post.update(post_params)
      redirect_to posts_path
    else 
      render 'edit'
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
   
    redirect_to posts_path
  end

  private 
  def post_params
    params.require(:post)
          .permit(:title, :title_slug, :content, :published_at, :series_id, :series_position)
  end
end
