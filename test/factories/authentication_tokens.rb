FactoryBot.define do
  factory :authentication_token do
    token { SecureRandom.urlsafe_base64 }
    user { create(:user) }
  end
end