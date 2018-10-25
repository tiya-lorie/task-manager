class Tasks::Destroy < ActiveInteraction::Base
  object :task

  def execute
    task.destroy
  end
end