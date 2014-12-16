var game = {
  currentAttacker: '',
  selectedMove:[],
  stage: [],
  pokemonOut:[],
  start: function(randomPokemon){
          this.stage = Stage.makeStageRandomMoves(randomPokemon);
          this.pokemonOut = this.stage[0].pokemons[0];
          this.currentAttacker = this.checkFirstMove();
          this.attackPhase();
        },
  checkFirstMove: function() {
            if (this.stage[0].pokemons[0].speed >= this.stage[1].speed){
              return this.currentAttacker = this.stage[0].pokemons[0].name;
                  }
            else {
              return this.currentAttacker = this.stage[1].name;
            }
        },
  play: function(){
          console.log("Random " + this.stage[1].name + " appears");
          console.log(this.stage[0].username + ' sends out ' + this.stage[0].pokemons[0].name);
        },
  show:function(){
    game.stage[0].pokeshow();
  },
  switch: function(){
    this.stage[0].pokeshow();
  },

// check faint
// render
  attackPhase:function(){
    for (var i = 0; i < this.stage[0].pokemons.length; i++){
      if (currentAttacker == this.stage[0].pokemons[i].name){

      }

      else {
        var random = this.stage[1].moves[Math.floor(Math.random()*this.stage[1].moves.length)];
        // var hpCut = pokemonOut.hp -  random;

      }
    }

  }





};
