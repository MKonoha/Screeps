var modJob = require('job');

var harvester = {  
    action(creep, target){
        if(creep && target){
            creep.harvest(target);
            creep.say("⛏️");
        }
    },

    getJob(source){
        const input = {
            target: source,
            partsRequired: [WORK,MOVE,CARRY],
            action: this.action,
            type: "harvest"
        };
        return modJob.createJob(input);
    }

};

module.exports = harvester;