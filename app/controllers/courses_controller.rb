class CoursesController < ApplicationController
  layout "page"
  
  def index
    @courses = Course.all
  end

  def show
    @course = Course.find(params[:slug])
  end
end
