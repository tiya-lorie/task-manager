FactoryBot.define do
  factory :user do
    transient do
      authentication_tokens_count 1
    end
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password 'test123456'

    after :create do |user, evaluator|
      create_list(:authentication_token, evaluator.authentication_tokens_count, user: user)
    end
  end
end