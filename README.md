# Screeps
A collection of my scripts for the game Screeps.

## How To Use the Code
1. Installation -
  * Copy/Download the top level \*.js files and put them into your Screeps directory in the same way you would normally import files
2. Flag Syntax
  + Essential -
    * Source Flags - Marked in the format *S#* where # is the number of squares (out of the adjacent 8) that are minable from. If # is the same for multiple sources in the room, name the flags with doubles that are the same integer ie 3.0, 3.00, etc.
    * DropOffs - Maked by *DropOff#* and used to mark where the dedicated miners will deposit energy once they spawn (should be within one block of the source mining location and on a container of some sort)
    * Deliverys - Marked by *Deliver#* and should be on top of a container that is used often for other creeps, like near the controller for upgraders.
  + Construction Flags -
    * Walls - Denoted by *WallX##* where X is a direction denoted by *D* for down, *U*, *R*, or *L* and ## is the number of blocks to build the wall in that direction
    * Extensions - Marked in the middle of the formation. *Extensions1* and *Extensions2* are plus signs (one extension in the middle, one in each cardnal direction) while *Extensions3* and *Extensions4* are rows of 5 horrizontally the row above the flag and below.
    * Towers - Marked by in the format *Tower1* since they are unlocked at different times.
    * Containers - Just marked by *Container* can only place one flag at a time, may change.

3. Explanation of Tiers -
  + The tiers are when different bodies of creeps spawn, or at Tier 4 when a new type takes over a job. This is based on the amount of energy available in the room. Reverts temporarily in order to spawn harvesters if needed.

4. Explanation of Memory -
  + Most max number are stored in *Memory.roles* and *Memory.towersMem* is where the tower target and mode is stored.
  + initialized the first time the script is run, or when the *Memory.initialized* value is false.
