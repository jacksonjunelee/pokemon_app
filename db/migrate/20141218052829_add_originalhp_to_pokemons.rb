class AddOriginalhpToPokemons < ActiveRecord::Migration
  def change
    add_column :pokemons, :max_hp, :integer
  end
end
