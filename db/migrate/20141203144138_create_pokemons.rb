class CreatePokemons < ActiveRecord::Migration
  def change
    create_table :pokemons do |t|
      t.string :name
      t.string :nickname
      t.integer :api_ref
      t.integer :hp
      t.text :url_ref

      t.timestamps
    end
  end
end
