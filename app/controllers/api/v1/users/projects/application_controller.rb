class Api::V1::Users::Projects::ApplicationController < Api::V1::Users::ApplicationController
  private

  def set_project
  	
    @project = ::Projects::Find.run!(id: params[:project_id], user: current_user)
  end
end