class Users::Update < ActiveInteraction::Base
  object :user
  string :name, :email, :password, default: nil

  def execute
    attributes = inputs.except(:user).compact
    errors.merge!(user.errors) unless user.update(attributes)

    user
  end
end