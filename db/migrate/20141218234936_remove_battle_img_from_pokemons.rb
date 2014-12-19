class RemoveBattleImgFromPokemons < ActiveRecord::Migration
  def change
    remove_column :pokemons, :battle_img, :text
    remove_column :pokemons, :url_ref, :text
  end
end
