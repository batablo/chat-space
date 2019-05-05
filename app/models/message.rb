class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  validate :content, presence: true, unless: :image?

  mount_uploder :image, ImageUploader
end
