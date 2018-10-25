FactoryBot.define do
  factory :project do
    title { Faker::Job.title }
    description { Faker::Job.title }
    status { 'new' }
    user_id { create(:user).id }
  end
end