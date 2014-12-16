class AddMoreMoreDetailsToPokemon < ActiveRecord::Migration
  def change
    add_column :pokemons, :battle_img, :text
  end
end
