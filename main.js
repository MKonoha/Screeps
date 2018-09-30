var spawnModule = require('module.spawning');
var memoryModule = require('module.memory');
var jobManager = require('module.jobManager');

//main loop
module.exports.loop = function () {

    if(!Memory.initialized){
        memoryModule.init();
    }

    for (const roomName in Game.rooms){
        spawnModule.spawn(roomName);
        
        const allCreeps = Game.creeps;
        const thisRoomCreeps = _.filter(allCreeps, (creep) => (creep.room.name === roomName));
        const currentSpawnQueue = memoryModule.getSpawnQueue(roomName);

        jobManager.findNeededJobs(roomNameroomName,thisRoomCreeps);

        if(thisRoomCreeps.length + currentSpawnQueue.length < 5){
            spawnModule.enqueueGeneric(roomName);
        }

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            //TODO
        }
    }

};
