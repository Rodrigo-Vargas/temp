class AdminController < ApplicationController
  before_filter :authenticate_user_admin, :only => :posts
  def posts
    @posts = Post.all
  end

  def users
    @users = User.all
  end
end
