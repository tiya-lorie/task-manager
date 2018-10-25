class Api::V1::UsersController < Api::V1::ApplicationController
  skip_before_action :authenticate_with_token!, only: %i[create]

  def create
    user = ::Users::Create.run!(params)
    render json: { user: user.as_json }
  end

  def update
    user = ::Users::Update.run!(params.merge(user: current_user))
    render json: { user: user.as_json }
  end
end
