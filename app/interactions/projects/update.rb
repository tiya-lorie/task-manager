class Projects::Update < ActiveInteraction::Base
  object :project
  string :title, :description, :status, default: nil

  def execute
    attributes = inputs.except(:project).compact
    errors.merge!(project.errors) unless project.update(attributes)

    project
  end
end