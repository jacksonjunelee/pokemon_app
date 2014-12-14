var game = {
  stage: [],
  start: function(callback){
          this.stage = Stage.makeStageRandomMoves();
          console.log(this)
          callback(this);
        },
  play: function(){
          console.log("Random " + this.stage[1].name + " appears");
          console.log(this.stage[0].username + ' sends out ' + this.stage[0].pokemons[0].name);


        }







};
