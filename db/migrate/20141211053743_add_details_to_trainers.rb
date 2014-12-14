class AddDetailsToTrainers < ActiveRecord::Migration
  def change
    add_attachment :trainers, :avatar
    add_column :trainers, :phone, :string
  end
end
