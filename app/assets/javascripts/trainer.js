var Me = function(id){
  this.id = id,
  this.username;
  this.pokemons;
  var me =this;
  $.get('/trainers/' + id +'.json').done(function(data){
          me.username = data[0].username;
          me.pokemons = data[1];
          for (var i = 0; i < data[1].length; i++){
                me.pokemons[i].faint = false;
              }
      });
};

Me.prototype.pokeswitch = function(index){
  // this.pokemons[index];
  game.pokemonOut = game.stage[0].pokemons[index];
  $('.textarea').append("\n" + game.stage[0].username + " sends out " + game.pokemonOut.name).animate({scrollTop: 600});

  // Give random Moves
  $.get('/pokemons/'+ game.pokemonOut.api_ref + '/pokemon/fetch').done(function(data){
    for (var i =0; i < 4; i++){
      var random = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
      var move = random.resource_uri;
      $.get('//www.pokeapi.co' + move).done(function(move_data){
        game.pokemonOutMoves.push(move_data);
      });
    }
  });

$('#username').text(game.stage[0].username);
$('#myPokemonName').text("\n" + game.pokemonOut.name + "\n" + game.pokemonOut.nickname);
$('#myPokemonHp').text('Hp:' + game.pokemonOut.hp);
$('#myPokemon').attr('src', window.location.origin + '/image/' + game.pokemonOut.api_ref);
$('#myHealth').val(game.pokemonOut.hp).attr('max',game.pokemonOut.max_hp);
    game.checkFirstMove();

};


Me.prototype.catch = function(){
  // add if statement with MAth.random, var chances
  // nickname

  var takenPosition = game.stage[0].pokemons.map(function(num){
    return num.position;
  }).sort().pop();
  var position = takenPosition + 1;

  var catchPokemon = {
    pokemon: {
      name: game.stage[1].name,
      api_ref: game.stage[1].id,
      hp: game.stage[1].hp,
      speed: game.stage[1].speed,
      trainer_id: this.id,
      position: position,
      max_hp: game.stage[1].max_hp,
      battle_img: "/assets/pokemon-main-sprites/yellow/back/" + game.stage[1].id + ".png"
    }
  };
  game.stage[0].pokemons.push(catchPokemon.pokemon);

  $.post('/pokemons', catchPokemon).done(function(){
    $('#gameConsole').remove();
  });
  // .done(); close window
};
