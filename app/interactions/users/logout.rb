class Users::Logout < ActiveInteraction::Base
  object :user
  string :auth_token

  def execute
    token = user.authentication_tokens.find_by_token(auth_token)

    errors.add(:token, 'does not exist') if token.nil? || !token.destroy
  end
end