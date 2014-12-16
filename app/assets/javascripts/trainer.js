var Me = function(id){
  this.id,
  this.username;
  this.pokemons;
  this.pokemons.moves;
  var me =this;
  $.get('/trainers/' + id +'.json').done(function(data){
          me.username = data.username;
          $('#me').text(me.username);
          me.pokemons = data.pokemons;
          $('#myPokemonName').text(me.pokemons[0].nickname);
          $('#myPokemonHp').text('Hp:' + me.pokemons[0].hp);
          $('#myPokemon').attr('src', me.pokemons[0].battle_img);

          // for (var i = 0; i < me.pokemons.length; i++){
          //   var integer = i;
            $.get('/pokemons/'+ me.pokemons[0].api_ref + '/pokemon/fetch').done(function(data){
              me.pokemons[0].moves0 = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
              me.pokemons[0].moves1 = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
              me.pokemons[0].moves2 = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
              me.pokemons[0].moves3 = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
            });
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
