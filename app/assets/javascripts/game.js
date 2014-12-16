var game = {
  currentAttacker: [],
  selectedMove:[],
  stage: [],
  pokemonOut:[],
  pokemonOutMoves:[],
  start: function(randomPokemon){
          var pokemon = new Pokemon(randomPokemon);
          this.stage.push(pokemon);
          this.pokemonOut = this.stage[0].pokemons[0];
  },
  assign: function(){
          var Outmoves = [];
          for (var i = 0; i < 4; i++){
            var move = this.stage[0].pokemons[0].randomMoves[i].resource_uri;
            $.get('http://www.pokeapi.co' + move).done(function(data){
              Outmoves.push(data);
            });
          }
          this.pokemonOutMoves = Outmoves;
          $('#me').text(this.stage[0].username);
          $('#myPokemonName').text(this.pokemonOut.nickname);
          $('#myPokemonHp').text('Hp:' + this.pokemonOut.hp);
          $('#myPokemon').attr('src', this.pokemonOut.battle_img);

  },
  checkFirstMove: function() {
            if (this.pokemonOut.speed >= this.stage[1].speed){
              return this.currentAttacker = this.pokemonOut;
                  }
            else {
              return this.currentAttacker = this.stage[1];
            }
  },

// check faint
// render
  attackPhase:function(){
      if (this.currentAttacker === this.pokemonOut){
        this.stage[1].hp -= (this.pokemonOutMoves[0].power/5);
        this.currentAttacker = this.stage[1];
        this.checkFaint();
        this.checkSwitch();
      }

      else {
        var random = this.stage[1].moves[Math.floor(Math.random()*this.stage[1].moves.length)];
        var myPoke = this;
          $.get('http://www.pokeapi.co' + random.resource_uri).done(function(data){
            myPoke.pokemonOut.hp -= (data.power/5);
            myPoke.currentAttacker = myPoke.pokemonOut;
          });
            this.checkFaint();
        // var hpCut = pokemonOut.hp -  random;
      }
  },

  checkFaint: function(){
    if (this.pokemonOut.hp <= 0){
      this.pokemonOut.faint = true;
      // switch pokemon
    }

    if(this.stage[1].hp <= 0){
      $('#gameConsole').hide();
    }
  },

  checkSwitch: function(){
    if (this.currentAttacker.faint === false){
      this.stage[0].pokeswitch();
    }
  }
  // play: function(){
  //         console.log("Random " + this.stage[1].name + " appears");
  //         console.log(this.stage[0].username + ' sends out ' + this.stage[0].pokemons[0].name);
  //       },
  // show:function(){
  //   return game.stage[0].pokeshow();
  // },
  // switch: function(){
  //   this.stage[0].pokeshow();
  // },
  // }





};
