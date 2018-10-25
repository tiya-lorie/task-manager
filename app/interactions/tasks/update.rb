class Tasks::Update < ActiveInteraction::Base
  object :task
  string :title, :description, :status

  def execute
    attributes = inputs.except(:task).compact
    errors.merge!(task.errors) unless task.update(attributes)

    task
  end
end