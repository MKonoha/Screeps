//Modules
var modSpawning = require('module.spawning');
var modCommon = require('module.common');
var modStructures = require('module.structures');
var modMemory = require('module.memory');
var modAssist = require('module.assist');

//main loop
module.exports.loop = function () {

  //Only initialize if it hasnt been done (or it was manually set to false)
  if(Memory.initialized!==true){
    modMemory.init();
  }

  //Loop to check each room that is visible to the script
  for(var roomName in Memory.rooms){
    var room = Game.rooms[roomName];

    //Creep lists in each room, comparing lengths shows if there are 'others'
    var allCreepList = room.find(FIND_CREEPS);
    var myCreepList = _.filter(allCreepList, (creep) => (creep.owner && creep.owner.username ==="PCarton"));
    var enemyPresent = allCreepList.length>myCreepList.length;

    //Al the structures in the room that are controlled by the player
    var allStructs = room.find(FIND_MY_STRUCTURES);
    var towers = _.filter(allStructs, (struct) => struct.structureType === STRUCTURE_TOWER);

    if(allStructs.lenth <=0){
      //TODO add builders/upgraders to spawn queue in nearest controlled room
    }

    for(var tower in towers){
      if(Memory.rooms[roomName].towers[tower.id] === null){
        modMemory.initTower(tower);
      }
    }

    //Clear dead creeps from memory
    modCommon.clearDead();

    //assign the right run method to each creep based on its role
    for(var name in myCreepList) {
        var creep = myCreepList[name];

        //Has the non-military creeps retreat
        //Mining creeps are considered military - like the supply line
        if(!room.controller.safeMode && enemyPresent && creep.memory.military !== true){
          modCommon.retreat(creep);
        }
        //if the creep is to assist
        else if(creep.memory.assist){
          modAssist.run(creep);
        }
        //If there are no enemies, run the appropriate role method
        else{
          modCommon.runCreep(creep);
        }
    }

    //determine if new creeps need to be spawned and pick an appropriate spawner
    //Spawn logic is in a seperate module
    if(Memory.rooms[roomName].roles.numCreeps < modSpawning.maxCreeps){
      if(Game.time%modConstants.spawnFrequency===0)
        modSpawning.enqueueAllNeeded(roomName);
      modSpawning.spawn(roomName);
    }

    var control = room.controller;

    if(enemyPresent && modCommon.playerAttack(allCreepList) && !(control.safeMode || control.safeModeCooldown) && control.safeModeAvailable > 0 ){
      control.activateSafeMode();
      Game.notify(modCommon.linkRoomAtTick(room,Game.time,"Activated Safe Mode"),0);
    }

    var newEnemy = true;



    for(var towerId in Memory.rooms[roomName].towers){
      if(Memory.rooms[roomName].towers[towerId].mode === "attack")
        newEnemy = false;
      var towerObj = Game.getObjectById(towerId);
      if(enemyPresent){
        Memory.rooms[roomName].towers[towerId].mode = "attack";
        var targetID =   Memory.rooms[roomName].towers[towerId].target;
        var target = null;
        try{
          target = Game.getObjectById(targetID);
        }catch(err){
          console.log(err.name + "\n" + err.message);
        }
        if(!target){
          modStructures.pickTargets(room.controller, allCreepList);
        }
      }else{ //TODO check for injured creeps and set to heal, maybe room variable that triggers on hit
        Memory.rooms[roomName].towers[towerId].mode = "repair";
      }
      modStructures.runTower(towerObj,allCreepList);
    }

    if(enemyPresent && newEnemy)
      Game.notify(modCommon.linkRoomAtTick(room, Game.time, "EnemyFound"),60);
  }
};
