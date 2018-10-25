class Api::V1::Users::ProjectsController < Api::V1::Users::ApplicationController
  before_action :set_project, except: %i[index create]

  def index
    projects = ::Projects::List.run!(params.merge(user: current_user))
    render json: { projects: projects.as_json }
  end

  def show
    render json: { project: @project.as_json }
  end

  def create
    project = ::Projects::Create.run!(params.merge(user: current_user))
    render json: { project: project.as_json }
  end

  def update
    ::Projects::Update.run!(params.merge(project: @project))
    render json: { project: @project.as_json }
  end

  def destroy
    ::Projects::Destroy.run!(project: @project)
    render json: { message: 'Project deleted successfully' }
  end

  private

  def set_project
    @project = ::Projects::Find.run!(id: params[:id], user: current_user)
  end
end
