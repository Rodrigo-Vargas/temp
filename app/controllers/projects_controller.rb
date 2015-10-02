class ProjectsController < ApplicationController
  before_filter :authenticate_user_admin, :only => [:new, :edit, :create, :update, :destroy]

  def index
    @projects = Project.all
  end

  def show
    @project = Project.find_by_title_slug(params[:title_slug])
  end

  def new
    @project = Project.new
  end

  def edit
    @project = Project.find(params[:id])
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      redirect_to projects_path
    else 
      render 'new'
    end
  end

  def update
    @project = Project.find(params[:id])

    if @project.update(project_params)
      redirect_to projects_path
    else 
      render 'edit'
    end
  end

  def destroy
    @project = Project.find(params[:id])

    @project.destroy

    redirect_to admin_projects_path
  end

  private
  def project_params
    params.require(:project).permit(:title, :title_slug, :link, :skills, :description, :image_ids => [])
  end
end
