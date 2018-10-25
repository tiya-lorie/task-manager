class Users::CheckRegistration < ActiveInteraction::Base
  integer :id
  string :email

  def execute
    user = User.find(id)

    if user[:email] == email
      true
    else
      errors.add(:user, "User with id #{id} and email #{email} is not registered")
    end
  end
end