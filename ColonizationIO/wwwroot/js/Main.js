var gameManager = new GameManager();
//var gameHub = new GameHub();//kicks everything off?


function CreateMenu() {
    gameManager.phaserState.physics.add.image(50, 120, 'MenuMenu');
    CreateMenuItem(50, 50, 'BuildingCity');
    CreateMenuItem(50, 90, 'BuildingFarm');
    CreateMenuItem(50, 130, 'BuildingRoadLeftRight');
    ClearSelectedItem(50, 170);
}
function CreateMenuItem(x, y, type) {
    var menuBuilding = gameManager.phaserState.physics.add.image(x, y, type).setInteractive();
    menuBuilding.on('pointerup', function (pointer) {
        gameManager.phaserGame.map.off('pointerup');
        gameManager.phaserGame.map.on('pointerup', function (pointer) {
            PlaceBuilding(pointer, type);
        });
    });
}
function ClearSelectedItem(x, y) {
    var menuBuilding = gameManager.phaserState.physics.add.image(x, y, "MenuX").setInteractive();
    menuBuilding.on('pointerup', function (pointer) {
        gameManager.phaserGame.map.off('pointerup');
        gameManager.phaserGame.map.on('pointerup', function (pointer) {
            OpenCityMenu(pointer);
        });
    });
}

function CreateTileHighlighter() {
    var graphics = gameManager.phaserState.add.graphics({ lineStyle: { width: 2, color: 0xffffff } });
    var rect = new Phaser.Geom.Rectangle();
    gameManager.phaserState.input.on('pointermove', function (pointer) {
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
function OpenCityMenu(pointer) {
    console.log(pointer);
    var selectedTile = gameManager.GetSelectedTile(pointer.upX, pointer.upY);
    if (gameState.cityMenu.open)
    {
        gameState.cityMenu.destroyMenu();
    }
    if (selectedTile.buildingReference !== null && selectedTile.buildingReference.buildingType === "BuildingCity")
    {
        var tempMenu = new Menu();
        tempMenu.graphic = gameManager.phaserState.physics.add.image(pointer.upX + 110, pointer.upY + 80, 'MenuCity');
        tempMenu.open = true;
        gameState.cityMenu = tempMenu;
        //items to add
        tempMenu.addMenuItemText(tempMenu.graphic.x - 80, tempMenu.graphic.y - 90, 'Name:' + selectedTile.buildingReference.name, gameManager.phaserState);
        tempMenu.addMenuItemText(tempMenu.graphic.x - 80, tempMenu.graphic.y - 70, 'Pop:' + selectedTile.buildingReference.population, gameManager.phaserState);
        tempMenu.addMenuItemText(tempMenu.graphic.x - 80, tempMenu.graphic.y - 50, 'Food:' + selectedTile.buildingReference.foodReserve, gameManager.phaserState);
    }
    //menuBuilding.disableBody(true, true);
}
function PlaceBuilding(pointer, BuildingName) {
    var selectedTile = gameManager.GetSelectedTile(pointer.upX, pointer.upY);
    gameManager.gameHub.CallPlaceBuilding("BuildingCity", selectedTile)
}