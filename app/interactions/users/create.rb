class Users::Create < ActiveInteraction::Base
  string :name, :email, :password

  def execute
    user = User.new(inputs)

    errors.merge!(user.errors) unless user.save

    user
  end
end