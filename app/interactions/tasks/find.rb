class Tasks::Find < ActiveInteraction::Base
  object :project
  integer :id

  def execute
    project.tasks.find(id)
  end
end