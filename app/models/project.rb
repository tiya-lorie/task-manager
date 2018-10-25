class Project < ApplicationRecord
  belongs_to :user
  has_many :tasks, dependent: :destroy

  validates :title, length: { minimum: 1 }
  validates :description, length: { minimum: 1 }
  validates_presence_of :title
end
