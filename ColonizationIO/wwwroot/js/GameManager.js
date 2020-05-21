class GameManager
{
    //Initialization
    constructor(){
        this.gameHub = new GameHub();
        this.phaserGame = null;
        this.phaserState = null;
        this.serverGameState = null;
        this.clientGameState = new ClientGameState();
    }
    StartGameInitialization() {
        this.gameHub.CallInitializeGameState();
    }
    InitializeGameState(gs) {//TODO better name for this?
        this.phaserGame = new Phaser.Game(config);
        this.serverGameState = gs;
    }
    SynchronizeGameState() {
        this.serverGameState.buildings.forEach(function (value) {
            gameManager.BuildCity(value.buildingType, value.tile, value.buildingID)
        });
    }

    
    //Game Action Functions
    BuildCity(buildingType, selectedTile, buildingID) {
        var bg = new BuildingGraphic();
        bg.tile = selectedTile;
        bg.buildingType = buildingType;
        bg.id = buildingID;
        bg.graphic = this.phaserState.physics.add.image(selectedTile.xMid, selectedTile.yMid, buildingType);
        this.clientGameState.buildingGraphics.push(bg);
    }
    //UI Functions
    CreateTileHighlighter() {
        var graphics = this.phaserState.add.graphics({ lineStyle: { width: 2, color: 0xffffff } });
        var rect = new Phaser.Geom.Rectangle();
        this.phaserState.input.on('pointermove', function (pointer) {
            graphics.clear();
            var selectedTile = gameManager.GetSelectedTile(pointer.x, pointer.y);
            rect.x = selectedTile.xStart;
            rect.y = selectedTile.yStart;
            rect.width = selectedTile.width;
            rect.height = selectedTile.height;
            var area = Phaser.Geom.Rectangle.Area(rect);
            graphics.fillStyle(0xFFFFFF, .5);
            graphics.fillRectShape(rect);
        });
    }
    //Menu Functions
    CreateMenu() {
        this.phaserState.physics.add.image(50, 120, 'MenuMenu');
        this.CreateMenuItem(50, 50, 'BuildingCity');
        this.CreateMenuItem(50, 90, 'BuildingFarm');
        this.CreateMenuItem(50, 130, 'BuildingRoadLeftRight');
        this.CreateMenuItemClear(50, 170);
    }
    CreateMenuItem(x, y, type) {
        var menuBuilding = this.phaserState.physics.add.image(x, y, type).setInteractive();
        menuBuilding.on('pointerup', function (pointer) {
            gameManager.phaserGame.map.off('pointerup');
            gameManager.phaserGame.map.on('pointerup', function (pointer) {
                gameManager.PlaceBuilding(pointer, type);
            });
        });
    }
    PlaceBuilding(pointer, BuildingName) {
        var selectedTile = this.GetSelectedTile(pointer.upX, pointer.upY);
        this.gameHub.CallPlaceBuilding("BuildingCity", selectedTile)
    }
    CreateMenuItemClear(x, y) {
        var menuBuilding = this.phaserState.physics.add.image(x, y, "MenuX").setInteractive();
        menuBuilding.on('pointerup', function (pointer) {
            this.phaserGame.map.off('pointerup');
            this.phaserGame.map.on('pointerup', function (pointer) {
                OpenCityMenu(pointer);
            });
        });
    }
    OpenCityMenu(pointer) {
        var selectedTile = this.GetSelectedTile(pointer.upX, pointer.upY);
        var selectedBuilding = this.GetTileBuilding(selectedTile);
        if (this.clientGameState.cityMenu.open) {
            this.clientGameState.cityMenu.destroyMenu();
        }
        if (selectedBuilding !== null && selectedBuilding.buildingType === "BuildingCity") {
            var tempMenu = new Menu();
            tempMenu.graphic = gameManager.phaserState.physics.add.image(pointer.upX + 110, pointer.upY + 80, 'MenuCity');
            tempMenu.open = true;
            gameManager.clientGameState.cityMenu = tempMenu;
            //items to add
            tempMenu.addMenuItemText(tempMenu.graphic.x - 80, tempMenu.graphic.y - 90, 'Name:' + selectedBuilding.name, gameManager.phaserState);
            tempMenu.addMenuItemText(tempMenu.graphic.x - 80, tempMenu.graphic.y - 70, 'Pop:' + "0", gameManager.phaserState);
            tempMenu.addMenuItemText(tempMenu.graphic.x - 80, tempMenu.graphic.y - 50, 'Food:' + "0", gameManager.phaserState);
        }
    }
    //Helper Functions
    GetSelectedTile(xPixel, yPixel) {
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
    GetTileBuilding(tile) {
        var sGS = this.serverGameState;
        for (var x = 0; x < sGS.buildings.length; x++) {
            if (sGS.buildings[x].tile.x === tile.x && sGS.buildings[x].tile.y === tile.y) {
                return sGS.buildings[x];
            }
        }
    }
}