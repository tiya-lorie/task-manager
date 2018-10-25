require 'acceptance_helper'

resource 'Task' do
  subject(:message) { JSON.parse(response_body)['message'] }

  header 'Accept', 'application/json'
  header 'Content-Type', 'application/json'
  before { header 'Authorization', :token }

  let(:user) { create(:user) }
  let(:token) { user.authentication_tokens.first.token }
  let(:project) { create(:project, user_id: user.id) }
  let(:task) { create(:task, project_id: project.id) }
  let(:raw_post) { params.to_json }

  get api_v1_users_project_tasks_path(':project_id') do
    parameter :project_id, 'Project id', required: true

    let(:project_id) { project.id }

    example_request('task index') { expect(status).to be 200 }
  end

  get api_v1_users_task_path(':id') do
    parameter :id, 'Task id', required: true
    parameter :project_id, 'Project id', required: true

    let(:id) { task.id }
    let(:project_id) { project.id }

    example_request('task show') { expect(status).to be 200 }
  end

  post api_v1_users_project_tasks_path(':project_id') do
    parameter :title, 'Title', required: true
    parameter :description, 'Description'
    parameter :project_id, 'Project id', required: true

    let(:title) { 'Test' }
    let(:description) { 'test test' }
    let(:project_id) { project.id }

    example_request('task create') { expect(status).to be 200 }
  end

  put api_v1_users_task_path(':id') do
    parameter :title, 'Title'
    parameter :description, 'Description'
    parameter :id, 'Task id', required: true
    parameter :project_id, 'Project id', required: true

    let(:id) { task.id }
    let(:project_id) { project.id }
    let(:title) { 'Test new' }
    let(:description) { 'test test new' }

    example_request('task update') { expect(status).to be 200 }
  end

  delete api_v1_users_task_path(':id') do
    parameter :id, 'Task id', required: true
    parameter :project_id, 'Project id', required: true

    let(:id) { task.id }
    let(:project_id) { project.id }

    example_request('task delete') { expect(status).to be 200 }
  end
end
