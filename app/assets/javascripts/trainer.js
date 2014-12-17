var Me = function(id){
  this.id,
  this.username;
  this.pokemons;
  var me =this;
  $.get('/trainers/' + id +'.json').done(function(data){
          me.username = data.username;
          me.pokemons = data.pokemons;

          // for (var i = 0; i < me.pokemons.length; i++){
          //   var integer = i;
            $.get('/pokemons/'+ me.pokemons[0].api_ref + '/pokemon/fetch').done(function(data){
                me.pokemons[0].randomMoves = [];
              for (var i =0; i < 4; i++){
                var random = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
                me.pokemons[0].randomMoves.push(random);
              }
            });
      });
};

Me.prototype.pokeshow = function(){
  return this.pokemons;
};

Me.prototype.pokeswitch = function(index){
  // this.pokemons[index];
  game.pokemonOut = game.stage[0].pokemons[index];
    // if (game.pokemonOut.randomMoves === []){
    $.get('/pokemons/'+ game.pokemonOut.api_ref + '/pokemon/fetch').done(function(data){
      for (var i =0; i < 4; i++){
        var random = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
        game.pokemonOut.randomMoves.push(random);
      }
    game.assign();
    game.checkFirstMove();
    });
  // }
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
