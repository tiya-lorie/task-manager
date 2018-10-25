require 'acceptance_helper'

resource 'Sessions' do
  subject(:message) { JSON.parse(response_body)['message'] }

  header 'Accept', 'application/json'
  header 'Content-Type', 'application/json'
  let(:raw_post) { params.to_json }

  before { header 'Authorization', :token }
  let(:user) { create(:user) }
  
  post api_v1_users_sessions_path do
    parameter :email, 'Email', required: true
    parameter :password, 'Password'
 
    let(:email) { user.email }
    let(:password) { 'test123456' }
    example_request('session create') { expect(status).to be 200 }
  end

  delete api_v1_users_sessions_path do    
    let(:token) { user.authentication_tokens.first.token }
    example_request('session delete') { expect(status).to be 200 }
  end
end
