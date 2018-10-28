class Api::V1::Users::Projects::TasksController < Api::V1::Users::Projects::ApplicationController
  before_action :set_project
  before_action :set_task, except: %i[index create]

  def index
    tasks = ::Tasks::List.run!(params.merge(project: @project))
    render json: { tasks: tasks.as_json }
  end

  def show
    render json: { task: @task.as_json }
  end

  def create
    task = ::Tasks::Create.run!(params.merge(project: @project))
    render json: { task: task.as_json }
  end

  def update
    ::Tasks::Update.run!(params.merge(task: @task))
    render json: { task: @task.as_json }
  end

  def destroy
    ::Tasks::Destroy.run!(task: @task)
    render json: { message: 'Task deleted successfully' }
  end

  private

  def set_task
    @task = ::Tasks::Find.run!(id: params[:id], project: @project)
  end
end
