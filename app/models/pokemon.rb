class Pokemon < ActiveRecord::Base
  belongs_to :trainer
  # validates :position, uniqueness: {scope: :trainer_id}, except: :fetch change to uniqueness: true if trainer_if == current session user
  # attr_accessible :avatar
  # has_attached_file :avatar

end
