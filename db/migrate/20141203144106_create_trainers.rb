class CreateTrainers < ActiveRecord::Migration
  def change
    create_table :trainers do |t|
      t.string :username
      t.string :password_digest
      t.string :first_name
      t.string :last_name

      t.timestamps
    end
  end
end
