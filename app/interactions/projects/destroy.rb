class Projects::Destroy < ActiveInteraction::Base
  object :project

  def execute
    project.destroy
  end
end