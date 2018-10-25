class ApplicationController < ActionController::API
  include Authenticable

  before_action :authenticate_with_token!

  private

  def interaction_error_handler(exception)
    render json: { message: exception.message }, status: :bad_request
  end

  def not_found_error_handler(exception)
    render json: { message: exception.message }, status: :not_found
  end

  def access_denied_error_handler(exception)
    render json: { message: exception.message }, status: :forbidden
  end
end
