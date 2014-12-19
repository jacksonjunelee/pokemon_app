var goBack = $('<button>').attr('id','undo').text("Go Back").click(undo);

$(function(){
  var me = new Me(1);
  game.stage.push(me);

  var map = $('<div>').attr('id','map-canvas').css({"width":"400px","height":"500px"});
  $('body').append(map);

  var restartButton = $('<button>').attr('id','restart').text('Restart Game').click(restartGame);
  $('body').append(restartButton);

  if (localStorage.length === 5){
    $('body').prepend($('<p>').attr('id',"won").text("No More Pokemon ").css({"font-size":"300%"}));
  }

  initialize();
});

var gameStart= function(){
  if (!$('div#gameConsole').is(':visible')){
    loadGameDiv();
  }

  game.start(this.pokemon);
  game.checkFirstMove();

  var deleteLocation;
  for (var i=0; i<locations.length; i++){
    if (this.title === locations[i][0]){
      deleteLocation = locations[i];
      var key = deleteLocation[0];
    }
  }
  localStorage.setItem(key,JSON.stringify(deleteLocation));

  this.setMap(null);
};

var restartGame = function(){
  for (var deleteMarkers in localStorage){
    localStorage.removeItem(deleteMarkers);
    location.reload();
  }
};


var loadGameDiv = function() {

  var gameDiv = $('<div>').attr('id','gameConsole').css({"width":"400px","height":"500px",});

  var pokemonOpponentDiv = $('<div>').attr('id','pokemonOpponent').css({"width":"60%","height":"15%"});
  var pokemonName= $('<label>').addClass('pokeOpponent').attr('id','pokeName');
  var pokemonImageTag = $('<img>').addClass('pokeOpponent').attr('id','pokeImg');
  var pokemonHp = $('<label>').addClass('pokeOpponent').attr('id','pokeHp');
  var pokemonProgressBar = $('<progress>').attr('id','opponentHealth');

  var textConsole = $('<textarea>').addClass('textarea').css({"width": "80%", "height": "35%"});

  var myPokemonDiv = $('<div>').attr('id','myPokemonOut').css({"width":"10%","height":"20%"});
  var myName = $('<label>').addClass('username').attr('id','username');
  var myPokemonName = $('<label>').addClass('me').attr('id','myPokemonName');
  var myPokemonImageTag = $('<img>').addClass('me').attr('id','myPokemon');
  var myPokemonImageHp = $('<label>').addClass('me').attr('id','myPokemonHp');
  var myPokemonProgressBar = $('<progress>').attr('id','myHealth');

  // opponent pokemon is put on div
  (pokemonOpponentDiv).append(pokemonName).append(pokemonImageTag).append(pokemonHp).append(pokemonProgressBar);

  // Me and my Pokemon are put on Div
  (myPokemonDiv).append(myName).append(myPokemonName).append(myPokemonImageTag).append(myPokemonImageHp).append(myPokemonProgressBar);

  // All Divs put on the body
  (gameDiv).append(pokemonOpponentDiv).append(textConsole).append(myPokemonDiv);

  // renders User Options and appends it to the game Div
  loadOptionDiv(gameDiv);

  gameDiv.appendTo('body');
};

var loadOptionDiv = function(gameDiv){
  var optionDiv = $('<div>').attr('id','options').css({"width":"90%","height":"20%",});
  var attackButton = $('<button>').addClass('option').attr('id', 'attack').text('Attack').click(loadGameAttack);
  var switchButton = $('<button>').addClass('option').attr('id', 'switch').text('PKMN').click(loadGameSwitch);
  var itemButton = $('<button>').addClass('option').attr('id', 'item').text('Items').click(loadItem);
  var fleeButton = $('<button>').addClass('option').attr('id', 'flee').text('Flee').click(function(){
    $('div#gameConsole').remove();
  });

  optionDiv.append(attackButton).append(switchButton).append(itemButton).append(fleeButton);
  (optionDiv).appendTo(gameDiv);

};

var loadGameSwitch = function(){
  var allMyPokemonDiv = $('<div>').attr('id','myPokemonArray');

  for (var i =0; i < game.stage[0].pokemons.length; i++){
    var pokeButton = $('<button>').addClass('pokemonB').attr('id', i).text(game.stage[0].pokemons[i].name.toUpperCase()).click(gameSwitch);
    (pokeButton).appendTo(allMyPokemonDiv);
  }
  (allMyPokemonDiv).append(goBack);
  $('div#options').replaceWith(allMyPokemonDiv);
  $(allMyPokemonDiv).on('mouseenter','button.pokemonB',makeModalSwitch);
  $(allMyPokemonDiv).on('mouseleave','button.pokemonB',removeModalSwitch);
};

var loadGameAttack = function(){
  var myPokemonAttackDiv = $('<div>').attr('id','myPokemonAttackArray');
  for (var i =0; i < game.pokemonOutMoves.length; i++){
    var attackButtons = $('<button>').addClass('pokemonAttack').attr('id', i).text(game.pokemonOutMoves[i].name);
    (attackButtons).appendTo(myPokemonAttackDiv);
  }

  $('div#options').replaceWith(myPokemonAttackDiv);
  $(myPokemonAttackDiv).on('mouseenter','button.pokemonAttack',makeModalAttack);
  $(myPokemonAttackDiv).on('mouseleave','button.pokemonAttack',removeModalAttack);
  $(myPokemonAttackDiv).on('click','button.pokemonAttack',gameAttack);

};

var gameSwitch = function(){
  game.stage[0].pokeswitch(parseInt(this.id));
  $('div#myPokemonArray').hide();
  loadOptionDiv($('div#gameConsole'));
};

var gameAttack = function(){
  game.attackPhase(this.id);
  $('div#myPokemonAttackArray').hide();
  loadOptionDiv($('div#gameConsole'));
};

var loadItem = function(){
  var ItemDiv = $('<div>').attr('id','items').css({"width":"90%","height":"20%"});
  var catchButton = $('<button>').addClass('catch').attr('id', 'catchPokemon').text('Catch');

  ItemDiv.append(catchButton);

  $('div#options').replaceWith(ItemDiv);
  $(ItemDiv).on('click','button#catchPokemon',gameCatch);
};

var gameCatch = function(){
  game.stage[0].catch();
  $('div#items').hide();
  loadOptionDiv($('div#gameConsole'));
};

var makeModalAttack = function(){
  var modal = $('<div>').attr('id','modal');
  var name = $('<p>').addClass('modalAttack').text('Move Name: ' + game.pokemonOutMoves[this.id].name);
  var power = $('<p>').addClass('modalAttack').text('\nPower: ' + game.pokemonOutMoves[this.id].power);
  var pp = $('<p>').addClass('modalAttack').text('\nPP: ' + game.pokemonOutMoves[this.id].pp);
  var accuracy = $('<p>').addClass('modalAttack').text('\nAccuracy: ' + game.pokemonOutMoves[this.id].accuracy);
  var description = $('<p>').addClass('modalAttack').text('\nDescription: ' + game.pokemonOutMoves[this.id].description);
  modal.append(name).append(power).append(pp).append(accuracy).append(description);
  modal.appendTo('div#gameConsole');
  modal.show();
};

var removeModalAttack = function(){
  $('div#modal').hide();
};

var makeModalSwitch = function(){
  var modal = $('<div>').attr('id','modal');
  var name = $('<p>').addClass('modalSwitch').text('Name: ' + game.stage[0].pokemons[this.id].name);
  var nickname = $('<p>').addClass('modalSwitch').text('Nickname: ' + game.stage[0].pokemons[this.id].nickname);
  var hp = $('<p>').addClass('modalSwitch').text('Hp: ' + game.stage[0].pokemons[this.id].hp);
  var speed = $('<p>').addClass('modalSwitch').text('Speed: ' + game.stage[0].pokemons[this.id].speed);

  modal.append(name).append(nickname).append(hp).append(speed);

  modal.appendTo('div#gameConsole');
  modal.show();
};

var removeModalSwitch = function(){
  $('div#modal').hide();
};

var undo = function(){
  console.log("moo");
  // this.parent.replaceWith($('div#options'));
};
