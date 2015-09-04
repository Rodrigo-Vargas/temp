class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def show
    @post = Post.find(params[:id])
  end 

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(lesson_params)

    if @post.save
      redirect_to posts_path
    else 
      render 'new'
    end
  end

  private 
  def lesson_params
    params.require(:post).permit(:title, :content)
  end
end
