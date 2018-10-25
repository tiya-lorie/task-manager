class Task < ApplicationRecord
  belongs_to :project

  validates :title, length: { minimum: 1 }
  validates :description, length: { minimum: 1 }
  validates_presence_of :title
end
