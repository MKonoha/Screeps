var modCommon = require('module.common');

var roleStructures = {

  //Tower related functions
  inSight:function(pos, tower){

  },

  attack:function(tower){
    var enemy= Game.getObjectById(Memory.towersMem.target);
    if(enemy){
      tower.attack(enemy);
    }
  },

  heal:function(tower, allCreepList){
    var toFix = Memory.rooms[tower.room.name].towers[tower.id].target;
    var mode = Memory.rooms[tower.room.name].towers[tower.id].mode;
    if(toFix === null){
      var injured = modCommon.findInjured(allCreepList); //TODO add this to mem so it runs less often
      if(injured.length){
        tower.heal(injured[0]);
      }else{
        //TODO add target to that tower's memory
        //TODO check if same target is in memory of another tower first
        var damagedStructs;
        if(Memory.fortify){
          damagedStructs= modCommon.findToFixArr(tower.room);
          if(!damagedStructs.length && Memory.fortify){
            damagedStructs = modCommon.findToFortify(tower.room);
          }
        }else{
          damagedStructs= modCommon.findToFixArr(tower.room);
        }

        toFix = tower.pos.findClosestByRange(damagedStructs);

        if(toFix!==null){
          tower.repair(toFix);
        }
      }
    }else if( mode==="repair" ){
      tower.repair(toFix);
      if(!modCommon.stillToFix(toFix))
        toFix = null;
    }else if(mode==="heal"){
      tower.heal(toFix);
      if(toFix.hits===toFix.hitsMax)
        toFix = null;
    }

    Memory.rooms[tower.room.name].towers[tower].target = toFix;
  },

  runTower:function(tower, allCreepList){
    if(Memory.towersMem.mode === "attack"){
      this.attack(tower);
    }else if(tower.energy > 300){
      this.heal(tower,allCreepList);
    }

  },

  pickTargets:function(controller, allCreepList){
    //priority Targets
    var pTargets = _.filter(allCreepList, (creep) => (creep.owner && creep.owner.username !=="PCarton"));
    if(pTargets){
      if(pTargets.length){
        Memory.towersMem.target = pTargets[0].id;
      }
    }else{
      var targets = controller.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if(targets.length>0){
        Memory.towersMem.target = targets[0].id;
      }
    }
  }
  //End Tower related functions
};

module.exports = roleStructures;
