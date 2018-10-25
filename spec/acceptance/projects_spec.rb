require 'acceptance_helper'

resource 'Project' do
  subject(:message) { JSON.parse(response_body)['message'] }

  header 'Accept', 'application/json'
  header 'Content-Type', 'application/json'
  before { header 'Authorization', :token }

  let(:user) { create(:user) }
  let(:token) { user.authentication_tokens.first.token }
  let(:project) { create(:project, user_id: user.id) }
  let(:raw_post) { params.to_json }

  get api_v1_users_projects_path do
    example_request('project index') { expect(status).to be 200 }
  end

  get api_v1_users_project_path(':id') do
    parameter :id, 'Project id', required: true

    let(:id) { project.id }

    example_request('project show') { expect(status).to be 200 }
  end

  post api_v1_users_projects_path do
    parameter :title, 'Title', required: true
    parameter :description, 'Description'

    let(:title) { 'Test' }
    let(:description) { 'test test' }

    example_request('project create') { expect(status).to be 200 }
  end

  put api_v1_users_project_path(':id') do
    parameter :title, 'Title'
    parameter :description, 'Description'
    parameter :id, 'Project id', required: true

    let(:id) { project.id }
    let(:title) { 'Test new' }
    let(:description) { 'test test new' }

    example_request('project update') { expect(status).to be 200 }
  end

  delete api_v1_users_project_path(':id') do
    parameter :id, 'Project id', required: true

    let(:id) { project.id }

    example_request('project delete') { expect(status).to be 200 }
  end
end
