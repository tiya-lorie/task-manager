require 'acceptance_helper'

resource 'User' do
  subject(:message) { JSON.parse(response_body)['message'] }

  header 'Accept', 'application/json'
  header 'Content-Type', 'application/json'
  before { header 'Authorization', :token }

  let(:raw_post) { params.to_json }
  let(:user) { create(:user) }
  let(:token) { user.authentication_tokens.first.token }

  post api_v1_users_path do
    parameter :name, 'Name', required: true
    parameter :email, 'Email', required: true
    parameter :password, 'Password', required: true

    let(:name) { 'Test' }
    let(:email) { 'test@test.com' }
    let(:password) { 'password' }

    example_request('user create') { expect(status).to be 200 }
  end

  put api_v1_users_path do
    parameter :name, 'Name'
    parameter :email, 'Email'
    parameter :password, 'Password'

    let(:name) { 'Test new' }
    let(:email) { 'test_new@test.com' }
    let(:password) { 'password-new' }

    example_request('user update') { expect(status).to be 200 }
  end  
end
