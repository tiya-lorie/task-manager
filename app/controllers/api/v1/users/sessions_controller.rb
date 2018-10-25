class Api::V1::Users::SessionsController < Api::V1::Users::ApplicationController
  skip_before_action :authenticate_with_token!, only: [:create]

  def create
    user, token = ::Users::Login.run!(params)
    response = { user: user, token: token.token }
    render json: response
  end

  def destroy
    ::Users::Logout.run!(params.merge(user: current_user, auth_token: request.authorization))
    render json: { message: 'success' }
  end
end