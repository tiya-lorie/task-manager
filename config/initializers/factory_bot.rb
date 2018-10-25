if Rails.env.test?
  require 'factory_bot'

  class FactoryBot::Evaluator
    attr_reader :instance
  end
end