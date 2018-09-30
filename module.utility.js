var jobManager = require('module.jobManager');
var memoryModule = require('module.memory');
var utilityModule = {

  runCreep: function(creep){
    var job = creep.memory.job;
    if(job){
      jobManager.doJob(creep,job);
    }else{
      const newJob = memoryModule.dequeueJob(creep.room.name);
      memoryModule.storeCreepJob(creep, newJob);
    }
  },

};

module.exports = utilityModule;
