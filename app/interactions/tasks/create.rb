class Tasks::Create < ActiveInteraction::Base
  object :project
  string :title
  string :description, :status, default: nil

  def execute
    task = project.tasks.new(inputs.except(:project).compact)
    errors.merge!(task.errors) unless task.save

    task
  end
end