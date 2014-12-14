function Pokemon(id){
  this.id = id;
  this.name;
  this.nickname;
  this.hp;
  this.faint = false;
  this.moves = [];
  var pokemon = this;
  var api_pokemon = $.get('/pokemons/' + id + '/pokemon/fetch').done(function(data){
      pokemon.hp = data.hp;
      pokemon.name = data.name;
    for (var i =0; i < 4; i++){
      var random = data.moves[Math.floor(Math.random()*data.moves.length)];
      pokemon.moves.push(random);
    }
    });
}
Pokemon.prototype.attack = function(move){
  // var uri_move = move.resource_uri;
  // var id = uri_move.replace("/api/v1/move/","").replace('/','');
  $.get('/pokemons/' + move + '/move/fetch').done(function(data){
    pokeattack(data);
  });
};

var pokeattack = function(data){
  // console.log(data);
  // console.log(this);
  // console.log(data.name);
  var damage = (data.power);
  return damage;


};
