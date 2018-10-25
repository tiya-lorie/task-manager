class Projects::List < ActiveInteraction::Base
  object :user

  def execute
    user.projects
  end
end
