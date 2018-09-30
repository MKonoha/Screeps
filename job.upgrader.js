var jobModule = require('job');

var upgrader = {  
    action(creep, target){
        if(creep && target){
            creep.upgradeController(target);
            creep.say("🔨");
        }
    },

    getJob(controller){
        input = {
            target: controller,
            partsRequired: [WORK,MOVE,CARRY],
            action: upgradeAction,
            type: "upgrade",
            range: 3
        };
        return jobModule.createJob(input);
    }

};

module.exports = upgrader;