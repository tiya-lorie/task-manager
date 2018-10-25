class Projects::Create < ActiveInteraction::Base
  object :user
  string :title
  string :description, :status, default: nil

  def execute
    project = user.projects.new(inputs.except(:user).compact)
    errors.merge!(project.errors) unless project.save

    project
  end
end