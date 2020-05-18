class GameManager
{
    constructor(){
        this.gameHub = new GameHub();
        this.phaserGame = null;
        this.phaserState = null;
        this.serverGameState = null;
        this.clientGameState=new Object();
    }
    StartGameInitialization() {
        this.gameHub.CallInitializeGameState();
    }
    InitializeGameState(gs) {//TODO better name for this?
        this.phaserGame = new Phaser.Game(config);
        this.serverGameState = gs;
        //this.serverGameState.game = new Phaser.Game(config);
        this.clientGameState.buildingGraphics = new Array();
        this.clientGameState.cityMenu = new Menu();
        //TODO move client side functions to a seperate file
        this.GetSelectedTile = function (xPixel, yPixel) {
            var sGS = this.serverGameState;
            for (var x = 0; x < sGS.tilesXCount; x++) {
                for (var y = 0; y < sGS.tilesYCount; y++) {
                    if ((xPixel >= sGS.tiles[x][y].xStart && xPixel < sGS.tiles[x][y].xEnd) &&
                        (yPixel >= sGS.tiles[x][y].yStart && yPixel < sGS.tiles[x][y].yEnd)) {
                        return sGS.tiles[x][y];
                    }
                }
            }
        }
    }
}

//Initialize
function SynchronizeGameState() {
    console.log(gameState);
    gameState.buildings.forEach(function (value) {
        BuildBuilding(value.buildingType, value.tile, value.buildingID)
    });
}
function BuildBuilding(buildingType, selectedTile, buildingID) {
    var bg = new BuildingGraphic();
    bg.tile = selectedTile;
    bg.buildingType = buildingType;
    bg.id = buildingID;
    bg.graphic = gameManager.phaserState.physics.add.image(selectedTile.xMid, selectedTile.yMid, buildingType);
    gameManager.clientGameState.buildingGraphics.push(bg);
}