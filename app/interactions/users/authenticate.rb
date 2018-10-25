class Users::Authenticate < ActiveInteraction::Base
  string :password
  object :user

  def execute
    errors.add(:user, 'Incorect password') unless user.authenticate(password)
  end
end