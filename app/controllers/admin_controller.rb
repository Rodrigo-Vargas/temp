class AdminController < ApplicationController
  def posts
    @posts = Post.all
  end
end
