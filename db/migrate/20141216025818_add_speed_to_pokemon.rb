class AddSpeedToPokemon < ActiveRecord::Migration
  def change
    add_column :pokemons, :speed, :integer
  end
end
