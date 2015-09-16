class AdminController < ApplicationController
  before_filter :authenticate_user_admin, :only => [:posts, :users, :images]
  def posts
    @posts = Post.all.order(published_at: :desc)
  end

  def users
    @users = User.all
  end

  def images
    @images = Image.all
  end
end
