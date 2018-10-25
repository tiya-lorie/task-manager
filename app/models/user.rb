class User < ApplicationRecord

  has_many :projects, dependent: :destroy
  has_many :tasks, through: :projects
  has_many :authentication_tokens

  validates_uniqueness_of :email
  validates :name, length: { minimum: 1 }
  validates_presence_of :email

  has_secure_password
end