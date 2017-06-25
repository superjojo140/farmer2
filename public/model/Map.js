/**
 * Class representing a Map
 * @constructor
 * @param {number} height - Number of the tiles vertical
 * @param {number} width - Number of the tiles horizontal
 * @param {number} tileHeight -Vertical pixels per unique Tile
 * @param {number} tileWidth - Horizontal pixels per unique tile
 * @param {Array.Array.MapTile} tiles - a two dimensional Array with all MapTiles
 * @param {Renderer} renderer - The PIXI renderer
 */
function Map(height, width, tileHeight, tileWidth, tiles, renderer) {
    this.width = width;
    this.height = height;
    this.tileHeight = tileHeight;
    this.tileWidth = tileWidth;
    this.tiles = tiles;
    this.renderer = renderer;
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
            mySprite.x = myTile.x * this.tileWidth;
            mySprite.y = myTile.y * this.tileHeight;
            con.addChild(mySprite);
        }
    }
    return con;
};

/**
*Renders the Map on screen
*/
Map.prototype.render = function(){
    var container = this.toPixiContainer();
    this.renderer.render(container);
};
