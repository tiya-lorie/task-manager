FactoryBot.define do
  factory :task do
    title { Faker::Job.title }
    description { Faker::Job.title }
    status { 'new' }
    project_id { create(:project).id }
  end
end