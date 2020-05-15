var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};
var game;
var gameState;


//Initialize
function StartGameInitialization() {
    //TODO show loading here?
    CallInitializeGameState();
}
function InitializeGame(gs) {
    gameState = gs;
    gameState.game = new Phaser.Game(config);
    gameState.buildingGraphics = new Array();
    gameState.cityMenu = new Menu();
    //TODO move client side functions to a seperate file
    gameState.GetSelectedTile = function (xPixel, yPixel) {
        for (var x = 0; x < this.tilesXCount; x++) {
            for (var y = 0; y < this.tilesYCount; y++) {
                if ((xPixel >= this.tiles[x][y].xStart && xPixel < this.tiles[x][y].xEnd) &&
                    (yPixel >= this.tiles[x][y].yStart && yPixel < this.tiles[x][y].yEnd)) {
                    return this.tiles[x][y];
                }
            }
        }
    }
}
function SynchronizeGameState() {
    console.log(gameState);
    gameState.buildings.forEach(function (value) {
        BuildBuilding(value.buildingType,value.tile,value.buildingID)
    });
}

function preload() {
    this.load.image('MapMap', 'GameAssets/Images/Map/Map.png');
    this.load.image('MenuMenu', 'GameAssets/Images/Menu/Menu.png');
    this.load.image('BuildingCity', 'GameAssets/Images/Building/City.png');
    this.load.image('BuildingFarm', 'GameAssets/Images/Building/Farm.png');
    this.load.image('BuildingRoadLeftRight', 'GameAssets/Images/Building/RoadLeftRight.png');
    this.load.image('BuildingRoad3WayLeftBottomRight', 'GameAssets/Images/Building/Road3WayLeftBottomRight.png');
    this.load.image('BuildingRoad3WayLeftTopBottom', 'GameAssets/Images/Building/Road3WayLeftTopBottom.png');
    this.load.image('BuildingRoad3WayLeftTopRight', 'GameAssets/Images/Building/Road3WayLeftTopRight.png');
    this.load.image('BuildingRoad3WayTopBottomRight', 'GameAssets/Images/Building/Road3WayTopBottomRight.png');
    this.load.image('BuildingRoadCrossRoad', 'GameAssets/Images/Building/RoadCrossRoad.png');
    this.load.image('BuildingRoadLeftBottom', 'GameAssets/Images/Building/RoadLeftBottom.png');
    this.load.image('BuildingRoadRightBottom', 'GameAssets/Images/Building/RoadRightBottom.png');
    this.load.image('BuildingRoadRightTop', 'GameAssets/Images/Building/RoadRightTop.png');
    this.load.image('BuildingRoadTopBottom', 'GameAssets/Images/Building/RoadTopBottom.png');
    this.load.image('BuildingRoadTopLeft', 'GameAssets/Images/Building/RoadTopLeft.png');
    this.load.image('TerrainJungle', 'GameAssets/Images/Terrain/Jungle.png');
    this.load.image('TerrainMountain', 'GameAssets/Images/Terrain/Mountain.png');
    this.load.image('TerrainMountainCopper', 'GameAssets/Images/Terrain/MountainCopper.png');
    this.load.image('TerrainMountainIron', 'GameAssets/Images/Terrain/MountainIron.png');
    this.load.image('TerrainHorses', 'GameAssets/Images/Terrain/Horses.png');
    this.load.image('MenuX', 'GameAssets/Images/Menu/X.png');
    this.load.image('MenuCity', 'GameAssets/Images/Menu/MenuCity.png');
}

function create() {
    gameState.map = this.add.sprite(960, 540, 'MapMap').setInteractive();
    gameState.state = this;
    CreateMenu();
    CreateTileHighlighter();
    SynchronizeGameState();
}
function CreateMenu() {
    gameState.state.physics.add.image(50, 120, 'MenuMenu');
    CreateMenuItem(50, 50, 'BuildingCity');
    CreateMenuItem(50, 90, 'BuildingFarm');
    CreateMenuItem(50, 130, 'BuildingRoadLeftRight');
    ClearSelectedItem(50, 170);
}
function CreateMenuItem(x, y, type) {
    var menuBuilding = gameState.state.physics.add.image(x, y, type).setInteractive();
    menuBuilding.on('pointerup', function (pointer) {
        gameState.map.off('pointerup');
        gameState.map.on('pointerup', function (pointer) {
            PlaceBuilding(pointer, type);
        });
    });
}
function ClearSelectedItem(x, y) {
    var menuBuilding = gameState.state.physics.add.image(x, y, "MenuX").setInteractive();
    menuBuilding.on('pointerup', function (pointer) {
        gameState.map.off('pointerup');
        gameState.map.on('pointerup', function (pointer) {
            OpenCityMenu(pointer);
        });
    });
}

function CreateTileHighlighter() {
    var graphics = gameState.state.add.graphics({ lineStyle: { width: 2, color: 0xffffff } });
    var rect = new Phaser.Geom.Rectangle();
    gameState.state.input.on('pointermove', function (pointer) {
        graphics.clear();
        var selectedTile = gameState.GetSelectedTile(pointer.x, pointer.y);
        rect.x = selectedTile.xStart;
        rect.y = selectedTile.yStart;
        rect.width = selectedTile.width;
        rect.height = selectedTile.height;
        var area = Phaser.Geom.Rectangle.Area(rect);
        graphics.fillStyle(0xFFFFFF, .5);
        graphics.fillRectShape(rect);
    });    
}
function OpenCityMenu(pointer) {
    console.log(pointer);
    var selectedTile = gameState.GetSelectedTile(pointer.upX, pointer.upY);
    if (gameState.cityMenu.open)
    {
        gameState.cityMenu.destroyMenu();
    }
    if (selectedTile.buildingReference !== null && selectedTile.buildingReference.buildingType === "BuildingCity")
    {
        var tempMenu = new Menu();
        tempMenu.graphic = gameState.state.physics.add.image(pointer.upX + 110, pointer.upY + 80, 'MenuCity');
        tempMenu.open = true;
        gameState.cityMenu = tempMenu;
        //items to add
        tempMenu.addMenuItemText(tempMenu.graphic.x - 80, tempMenu.graphic.y - 90, 'Name:' + selectedTile.buildingReference.name, gameState.state);
        tempMenu.addMenuItemText(tempMenu.graphic.x - 80, tempMenu.graphic.y - 70, 'Pop:' + selectedTile.buildingReference.population, gameState.state);
        tempMenu.addMenuItemText(tempMenu.graphic.x - 80, tempMenu.graphic.y - 50, 'Food:' + selectedTile.buildingReference.foodReserve, gameState.state);
    }
    //menuBuilding.disableBody(true, true);
}
function PlaceBuilding(pointer, BuildingName) {
    var selectedTile = gameState.GetSelectedTile(pointer.upX, pointer.upY);
    connection.invoke("BuildBuilding", "BuildingCity", selectedTile);
}
//Main Timer
var mainTimer;
function StartMainTimer() {
    mainTimer = setInterval(function () { PerformMainTimerTick(); }, 5000);
}
function StopMainTimer() {
    mainTimer.clearInterval();
}
function PerformMainTimerTick() {
    gameState.PerformTick();
    console.log("day passed");
    console.log(gameState.buildings);
}