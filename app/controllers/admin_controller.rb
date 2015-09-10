class AdminController < ApplicationController
  def posts
    if (session[:user_name] == nil)
      redirect_to '/'
    end
    @posts = Post.all
  end
end
