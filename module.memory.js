var memoryHandler = {

  init(){
    Memory.rooms = {};
    for(var roomName in Game.rooms){
      this.initRoom(roomName);
    }
    Memory.initialized = true;
  },

  initRoom(roomName){
    Memory.rooms[roomName] = {
      spawnQ: [],
      jobQ: [],
      sources: getSourceIds(roomName),
      controller: Game.rooms[roomName].conroller.id,
      signMsg: "",
      initialized: false, //Set to true when init is run
    };
    Memory.rooms[roomName].initialized = true;
  },

  getSourceIds(roomName){
    var ids = [];
    const sources = Game.rooms[roomName].find(FIND_SOURCES);
    for(var source in sources){
      ids.push(source.id);
    }
  },

  storeCreepsJob(creep, job){
    creep.memory.job = job;
  },

  dequeueJob(roomName){
    Memory.rooms[roomName].jobQ.shift(job);
  },

  enqueueJob(roomName,job,priority){
    Memory.rooms[roomName].jobQ.push(job);
  },

  getJobQueue(roomName){
    return Memory.rooms[roomName].jobQ;
  },

  enqueueCreep(roomName,creepObj){
    Memory.rooms[roomName].spawnQ.push(creepObj);
  },

  getSpawnQueue(roomName){
    return Memory.rooms[roomName].spawnQ;
  },
};

module.exports = memoryHandler;
