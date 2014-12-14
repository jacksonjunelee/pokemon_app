class Trainer < ActiveRecord::Base
  has_many :pokemons, dependent: :destroy
  # attr_accessible :avatar
  # has_attached_file :avatar

end
