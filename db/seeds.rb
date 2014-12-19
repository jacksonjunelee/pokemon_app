# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Trainer.create(
username: "MCK"
)

Pokemon.create(
name: "Bulbasaur",
nickname: "SAUR",
api_ref: 1,
trainer_id: 1,
hp: 45,
faint: false,
speed: 45,
position: 2,
max_hp: 45
)

Pokemon.create(
name: "Charmander",
nickname: "CHAR",
api_ref: 4,
trainer_id: 1,
hp: 39,
faint: false,
speed: 65,
position: 3,
max_hp: 39
)

Pokemon.create(
name: "Charmeleon",
nickname: "CHARSWAG",
api_ref: 5,
trainer_id: 1,
hp: 58,
faint: false,
speed: 80,
position: 1,
max_hp: 58
)
