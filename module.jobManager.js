var memoryModule = require('module.memory');
var harvesterJob = require('job.harvester');
var upgraderJob = require('job.upgrader');

var JobManager = {
    doJob(creep, job){
        if(!job.partsRequired.every(val => creep.body.includes(val))){
            creep.memory.job = null
          }else{
            if(creep.pos.inRangeTo(job.target,job.range)){
              job.action(creep, target)
            }else{
              creep.moveTo(target)
            }
            if(job.endCondition(creep)){
              creep.memory.job = null
            }
          }
    },

    findNeededJobs(roomName,creepList){
      var sources = [];
      for(const id in Memory.rooms[roomName].sources){
        sources.push(Game.getObjectById(id));
      }

      const controller = Memory.rooms[roomName].controller;

      const jobQueue = memoryModule.getJobQueue(roomName);
      const allJobs = jobQueue.concat(creepList);

      const harvesters = _.filter(allJobss, (job) => {
        return job.type === "harvest";
      });

      const upgraders = _.filter(allJobss, (job) => {
        return job.type === "upgrade";
      });

      if(harvesters.length === 0){
        memoryModule.enqueueJob(roomName,harvesterJob.getJob(sources[0]));
      }
      if(upgraders.length === 0){
        memoryModule.enqueueJob(roomName,upgraderJob.getJob(controller));
      }  
    },

    getAllJobs(creepList){
      var jobs = [];
      for(var creep in creepList){
        job = creep.memory.job;
        if(job){
          jobs.push(job);
        }
      }
      return jobs;
    }
  
};
  
module.exports = JobManager;
  