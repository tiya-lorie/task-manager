class Users::CreateAuthenticationToken < ActiveInteraction::Base
  object :user

  def execute
    errors.add(:user, 'Unauthorized') unless create_token
    @token
  end

  private

  def create_token
    @token = user.authentication_tokens.create(token: SecureRandom.urlsafe_base64)
  end
end