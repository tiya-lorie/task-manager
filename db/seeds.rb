unless User.exists?
  user_names = %w(user_1 user_2 user_3 user_4 user_5)
  user_names.each_with_index do |name, index|
    User.create(
      user: name,
      password: 'password',
      email: "user_#{index + 1}@test.ua"
    )
  end
end