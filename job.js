//Module to define job types and end condition functions
var modJob = {

    createJob(input){
        return {
            target: input.target ? input.target : undefined,
            partsRequired: input.partsRequired ? input.partsRequired : [],
            endCondition: input.endConditon && typeof input.endCondition === "function" ? input.endCondition : this.defaultEndCondition,
            action:  input.action && typeof input.acion === "function" ? input.action : this.defaultAction,
            range: input.range ? input.range : 1,
            type: input.type ? input.type : "default"
        };
    },

    defaultAction(creep, target){
        creep.say("💤");
    },
    
    defaultEndCondition(creep){
        return false; //Never ends
    },

};

module.exports = modJob;