module Authenticable
  def current_user
    return @current_user if @current_user

    token = AuthenticationToken.find_by_token(request.authorization)

    return unless token.present?

    @current_user = token.user

    Thread.current[:current_user_id] = @current_user.id

    @current_user
  end

  def authenticate_with_token!
    render json: { message: 'Not authenticated' }, status: :forbidden if current_user.blank?
  end
end