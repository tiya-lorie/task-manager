class Users::Login < ActiveInteraction::Base
  string :email
  string :password

  def execute
    user = compose(Users::Find, email: email)
    compose(Users::Authenticate, password: password, user: user)

    token = compose(Users::CreateAuthenticationToken, user: user)

    [user, token]
  end
end