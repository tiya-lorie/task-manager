class ApplicationCable::Connection < ActionCable::Connection::Base
  identified_by :current_user

  def connect
    self.current_user = find_verified_user
  end

  private

  def find_verified_user
    verified_user = AuthenticationToken.find_by_token(request.params[:token])&.user
    verified_user || reject_unauthorized_connection
  end
end
