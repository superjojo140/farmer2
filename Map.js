/**
 * Class representing a Map
 * @constructor
 * @param {number} height - Number of the tiles vertical
 * @param {number} width - Number of the tiles horizontal
 * @param {Array.Array.MapTile} tiles - a two dimensional Array with all MapTiles
 */
function Map(height, width, tiles) {
    this.width = width;
    this.height = height;
    this.tiles = tiles;
}
/**
 *Makes a Pixi Container out if a Map
 *@return {Container} The generated Pixi Container
 */
Map.prototype.toPixiContainer = function () {
    var con = new PIXI.Container();
    for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
            var myTile = this.tiles[i][j];
            var mySprite = new PIXI.Sprite(myTile.texture);
            mySprite.x = myTile.x * myTile.width;
            mySprite.y = myTile.y * myTile.height;
            con.addChild(mySprite);
        }
    }
    return con;
}