var game = {
  currentAttacker: [],
  selectedMove:[],
  stage: [],
  pokemonOut:[],
  pokemonOutMoves:[],
  start: function(randomPokemon){
          this.pokemonOut = this.stage[0].pokemons[0];
          var pokemon = new Pokemon(randomPokemon);
          this.stage.push(pokemon);
  },
  assign: function(){
          var outmoves = [];
          for (var i = 0; i < 4; i++){
            var move = this.pokemonOut.randomMoves[i].resource_uri;
            $.get('http://www.pokeapi.co' + move).done(function(data){
              outmoves.push(data);
            });
          }
          this.pokemonOutMoves = outmoves;

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

  attackPhase:function(id){
      if (this.currentAttacker === this.pokemonOut){
        this.stage[1].hp -= Math.round(this.pokemonOutMoves[id].power/3);
        $('.textarea').append("\n"+ this.pokemonOut.name + " attacks");
        $('.textarea').append("\n"+ this.pokemonOut.name + " used " + this.pokemonOutMoves[id].name);
        $('.textarea').append("\n"+ this.pokemonOut.name + " deals " + Math.round(this.pokemonOutMoves[id].power/3) + " damage");
        this.hpRender();
        console.log(Math.round(this.pokemonOutMoves[id].power/3));
        this.checkFaint();
        this.currentAttacker = this.stage[1];
        if (this.stage[1].faint === false){
          this.enemyAttack();
        }
      }

      else {
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
      myPoke.currentAttacker = myPoke.pokemonOut;
      $('.textarea').append("\nEnemy pokemon attacks");
      $('.textarea').append("\nEnemy " + myPoke.stage[1].name + " used " + data.name);
      $('.textarea').append("\nEnemy " + myPoke.stage[1].name + " deals " + Math.round(data.power/3) + " damage");
      myPoke.checkFaint();
      myPoke.checkSwitch();
    });
  },

  checkFaint: function(){
    if (this.pokemonOut.hp <= 0){
      this.pokemonOut.faint = true;
      // switch pokemon
    }

    if(this.stage[1].hp <= 0){
      this.stage[1].faint = true;
      debugger;
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
