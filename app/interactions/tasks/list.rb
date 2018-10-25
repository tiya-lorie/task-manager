class Tasks::List < ActiveInteraction::Base
  object :project

  def execute
    project.tasks
  end
end