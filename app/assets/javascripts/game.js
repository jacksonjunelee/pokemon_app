var game = {
  currentAttacker: [],
  selectedMove:[],
  stage: [],
  pokemonOut: null,
  pokemonOutMoves:[],
  start: function(randomPokemon){
            // Add sort array code here.
          for (var i=1; i< (game.stage[0].pokemons.length + 1); i++){
            if (this.stage[0].pokemons[i].faint === false){
              if (this.pokemonOut !== null) { break }
              this.pokemonOut = this.stage[0].pokemons[i];

              // Give random Moves
              $.get('/pokemons/'+ game.pokemonOut.api_ref + '/pokemon/fetch').done(function(data){
                for (var i =0; i < 4; i++){
                  var random = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
                  var move = random.resource_uri;
                  $.get('http://www.pokeapi.co' + move).done(function(move_data){
                    game.pokemonOutMoves.push(move_data);
                  });
                }
              });
            }
          }
          $('#username').text(this.stage[0].username);
          $('#myPokemonName').text("\n" + this.pokemonOut.name + "\n" + this.pokemonOut.nickname);
          $('#myPokemonHp').text('Hp:' + this.pokemonOut.hp);
          $('#myPokemon').attr('src', window.location.origin + '/image/' + this.pokemonOut.api_ref);
          $('#myHealth').val(this.pokemonOut.hp).attr('max',this.pokemonOut.max_hp);

          var pokemon = new Pokemon(randomPokemon);
          this.stage.splice(1,1,pokemon);
  },

  checkFirstMove: function() {
            if (this.pokemonOut.speed >= this.stage[1].speed){
              return this.currentAttacker = this.pokemonOut;
                  }
            else {
              return this.currentAttacker = this.stage[1];
            }
  },

  attackPhase:function(id){
      // User pokemon attacks if it is currentAttacker
      if (this.currentAttacker === this.pokemonOut){
        this.stage[1].hp -= Math.round(this.pokemonOutMoves[id].power/3);
        // puts attack,hp,damage information to text area
        $('.textarea').append("\n"+ this.pokemonOut.name + " attacks").animate({scrollTop: 600}).append("\n"+ this.pokemonOut.name + " used " + this.pokemonOutMoves[id].name).animate({scrollTop: 600}).append("\n"+ this.pokemonOut.name + " deals " + Math.round(this.pokemonOutMoves[id].power/3) + " damage").animate({scrollTop: 600});
        // renders hp bar
        this.hpRender();
        document.getElementById("opponentHealth").value = this.stage[1].hp;
        // check pokemon faint
        this.checkFaint();
        this.currentAttacker = this.stage[1];
        if ($('div#gameConsole').is(':visible')){
            // this.enemyAttack();
            setTimeout(function(){
              game.enemyAttack();
            },800);
        }
      }

      else {
        $('.textarea').append("\nEnemy speed is higher; Enemy attacks").animate({scrollTop: 600});
        this.enemyAttack();
        // var hpCut = pokemonOut.hp -  random;
      }
  },

  enemyAttack: function(){
    var random = this.stage[1].moves[Math.floor(Math.random()*this.stage[1].moves.length)];
    var myPoke = this;
    $.get('http://www.pokeapi.co' + random.resource_uri).done(function(data){
      myPoke.pokemonOut.hp -= Math.round(data.power/3);
      myPoke.hpRender();
      $('.textarea').append("\nEnemy pokemon attacks").animate({scrollTop: 600});
      $('.textarea').append("\nEnemy " + myPoke.stage[1].name + " used " + data.name).animate({scrollTop: 600});
      $('.textarea').append("\nEnemy " + myPoke.stage[1].name + " deals " + Math.round(data.power/3) + " damage").animate({scrollTop: 600});
      var health = document.getElementById("myHealth");
      health.value = myPoke.pokemonOut.hp;
      myPoke.currentAttacker = myPoke.pokemonOut;
      myPoke.checkFaint();
      myPoke.checkSwitch();
    });
  },

// checks Faint and sets up next battle
  checkFaint: function(){
    if (this.pokemonOut.hp <= 0){
      this.pokemonOut.faint = true;
      // switch pokemon
    }

    if(this.stage[1].hp <= 0){
      this.stage[1].faint = true;
      $('#gameConsole').remove();
      this.stage[1].faint = false;
      var me = this;
      $.get('/pokemons/'+ this.pokemonOut.api_ref + '/pokemon/fetch').done(function(data){
        me.pokemonOut.randomMoves = [];
        for (var i =0; i < 4; i++){
          var random = data[0].moves[Math.floor(Math.random()*data[0].moves.length)];
          me.pokemonOut.randomMoves.push(random);
        }
      });
      // for (var i=1; i<this.stage[0].pokemons;i++){
      //   this.stage[0].pokemons[i].randomMoves = [];
      // }
    }
  },

  checkSwitch: function(){
    if (this.pokemonOut.faint ===  true){
      $('button#switch').click();
    }

    else {
      this.hpRender();
    }
  },

  hpRender: function(){
    $('#myPokemonHp').text('Hp:' + this.pokemonOut.hp);
    $('#pokeHp').text('Hp:' + this.stage[1].hp);
  }

};
