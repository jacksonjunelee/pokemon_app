var Me = function(id){
  this.id,
  this.username;
  this.pokemons;
  var me =this;
  $.get('/trainers/' + id).done(function(data){
          me.username = data.username;
          me.pokemons = data.pokemons;
      });
};

Me.prototype.pokeshow = function(){
  return this.pokemons;
};

Me.prototype.pokeswitch = function(index){
  // this.pokemons[index];
  var battlePokemon = new Pokemon(index);
  return battlePokemon;
};

Me.prototype.catch = function(){
  console.log(pokemon);
  // add if statement with MAth.random, var chances

  // nickname
  var catchpokemon = {
    pokemon: {
      name: pokemon.name,
      api_ref: pokemon.id,
      hp: pokemon.hp,
      trainer_id: this.id
    }
  };

  $.post('/pokemons', catchpokemon);
  // .done(); close window
};
