var Me = function(id){
  this.id,
  this.username;
  this.pokemons;
  var me =this;
  $.get('/trainers/' + id +'.json').done(function(data){
          me.username = data.username;
          $('#me').text(me.username);
          me.pokemons = data.pokemons;
          $('#myPokemonName').text(me.pokemons[0].nickname);
          $('#myPokemonHp').text('Hp:' + me.pokemons[0].hp);
          $('#myPokemon').attr('src', me.pokemons[0].battle_img);

          for (var i =0; me.pokemons.length; i++){
            $.get('/pokemons/'+ i + '/pokemon/fetch').done(function(data){
              me.pokemons[i].moves0 = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
            });
          }
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
