class AddMoreDetailsToPokemons < ActiveRecord::Migration
  def change
    add_column :pokemons, :faint, :integer
    add_column :pokemons, :moves0, :string
    add_column :pokemons, :moves1, :string
    add_column :pokemons, :moves2, :string
    add_column :pokemons, :moves3, :string
  end
end
