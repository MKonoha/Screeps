var modConstants = {

  //Function to determine a modifier for the room used to calculate numbers of creeps
  //returns a number between 0 and 3 inclusive
  getConLvlMod:function(room){
    var controllerLvl = room.controller.level;
    return Math.ceil((controllerLvl-1)/3);
  },
  roomEnergyBuffer: 300000,
  structBuffer:1000,
  tier1EnergyMin: 0,
  tier2EnergyMin: 550,
  tier3EnergyMin: 800,
  tier4EnergyMin: 1300,
  spawnFrequency: 30, //in ticks
  maxCreeps: Memory.maxCreeps,
  maxPathCPU: 0.5 ,
  nearDeath:50, //ticks until death


};

module.exports = modConstants;
