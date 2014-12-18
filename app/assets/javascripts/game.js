var game = {
  currentAttacker: [],
  selectedMove:[],
  stage: [],
  pokemonOut:[],
  pokemonOutMoves:[],
  start: function(randomPokemon){
          // for (var i=0; i< game.stage[0].pokemons.length; i++){
          //   if (this.stage[0].pokemons[i].faint === false){
          //     if (this.pokemonOut.length === 1) { break }
          //     this.pokemonOut = this.stage[0].pokemons[i];
          //     this.assign();
          //   }
          // }
          this.pokemonOut = this.stage[0].pokemons[0];
          this.assign();
          var pokemon = new Pokemon(randomPokemon);
          this.stage.splice(1,1,pokemon);
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

          $('#username').text(this.stage[0].username);
          $('#myPokemonName').text("\n" + this.pokemonOut.name + "\n" + this.pokemonOut.nickname);
          $('#myPokemonHp').text('Hp:' + this.pokemonOut.hp);
          $('#myPokemon').attr('src', this.pokemonOut.battle_img);
          $('#myHealth').val(this.pokemonOut.hp).attr('max',this.pokemonOut.max_hp);

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
        $('.textarea').append("\n"+ this.pokemonOut.name + " attacks").animate({scrollTop: 600});
        $('.textarea').append("\n"+ this.pokemonOut.name + " used " + this.pokemonOutMoves[id].name).animate({scrollTop: 600});
        $('.textarea').append("\n"+ this.pokemonOut.name + " deals " + Math.round(this.pokemonOutMoves[id].power/3) + " damage").animate({scrollTop: 600});
        this.hpRender();
        var health = document.getElementById("opponentHealth");
        health.value = this.stage[1].hp;
        this.checkFaint();
        this.currentAttacker = this.stage[1];
        if (this.stage[1].faint === false){
          this.enemyAttack();
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
