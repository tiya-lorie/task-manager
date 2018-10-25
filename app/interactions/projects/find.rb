class Projects::Find < ActiveInteraction::Base
  object :user
  integer :id

  def execute
    user.projects.find(id)
  end
end