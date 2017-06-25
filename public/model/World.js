/**
 * Class representing a World
 * The World cares about managing the Players...
 * @constructor
 * @param {Object} container - The Container to add all the GameObjects
 */
function World(clientId,container) {
    this.container = container;
    this.players = [];
    this.clientId = clientId;
}

/**
*Add a Player to the GameObjects
* @param {String} id - The new Player's id
*/
World.prototype.addPlayer = function(id){
    var player = new Player(0,0,"pics/boy_down.png");
    this.players[id]=player;
    this.container.addChild(player.sprite);
}

/**
*Returns teh Player with the specified id
* @param {String} id - The new Player's id
*/
World.prototype.getPlayer = function(id){
    return this.players[id];
}

/**
*Let the world perform one step
*moves the players etc...
*/
World.prototype.doStep = function(){
    for (var i in this.players){
        this.players[i].move();
    }
}
