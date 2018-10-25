class Users::Find < ActiveInteraction::Base
  string :email

  def execute
    errors.add(:user, 'Not found!') unless find_user
    @user
  end

  private

  def find_user
    @user = User.find_by_email(email)
  end
end