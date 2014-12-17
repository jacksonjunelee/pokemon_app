class AddPositionsToPokemon < ActiveRecord::Migration
  def change
    add_column :pokemons, :position, :integer
  end
end
