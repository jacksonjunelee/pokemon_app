class AddDetailsToPokemons < ActiveRecord::Migration
  def change
    add_attachment :pokemons, :avatar
    add_reference :pokemons, :trainer, index:true
  end
end
