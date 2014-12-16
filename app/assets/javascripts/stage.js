var Stage = {
  makeStageRandomMoves: function(randomPokemon){
    var stage = [];

    var me = new Me(1);
    var pokemon = new Pokemon(randomPokemon);

    stage.push(me);
    stage.push(pokemon);
    return stage;
  }

};

// Stage.prototype.makestage = function(){
//   //need to change locations to this in the loadGameDiv
//   console.log(locations[0][4]);
//   var stage = [];
//
//   var me = new Me(1);
//   var pokemon = new Pokemon(locations[0][4]);
//
//   stage.push(me);
//   stage.push(pokemon);
//
//   return stage;
//
// };
