class Project < ApplicationRecord
  extend Enumerize

  belongs_to :user
  has_many :tasks, dependent: :destroy

  validates :title, length: { minimum: 1 }
  validates :description, length: { minimum: 1 }
  validates_presence_of :title

  enumerize :status, in: %i[new started paused done]
end
