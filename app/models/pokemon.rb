class Pokemon < ActiveRecord::Base
  belongs_to :trainer
  # attr_accessible :avatar
  # has_attached_file :avatar

end
