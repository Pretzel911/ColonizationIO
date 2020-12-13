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
    InitializeAfterPhaserCreate() {
        this.CreateTileHighlighter();
        this.InitializeCityPlacement();
        this.SynchronizeGameState();
    }
    SynchronizeGameState() {
        this.serverGameState.buildings.forEach(function (value) {
            gameManager.BuildCity(value)
        });
    }
    //Tick Functions
    RefreshGameStateAfterTick(updatedServerGameState) {
        this.serverGameState = updatedServerGameState;
        //TODO any client updates, if user has a window open or the screen needs updated after a tick
    }

    //Communication Functions
    PlaceCity(pointer) {
        var selectedTile = this.GetSelectedTile(pointer.upX, pointer.upY);
        this.gameHub.CallConstructCity("BuildingCity", selectedTile)
    }
    
    //Game Action Functions
    BuildCity(city) {
        var bg = new BuildingGraphic();
        bg.tile = city.tile;
        bg.buildingType = city.buildingType;
        bg.id = city.id;
        bg.graphic = this.phaserState.physics.add.image(city.tile.xMid, city.tile.yMid, city.buildingType);
        bg.labelGraphic = this.phaserState.add.text(city.tile.xMid, city.tile.yMid+20, city.name, { fontFamily: '"Times New Roman", Times, serif',  fontSize: '20px', fill: '#000' });
        bg.labelGraphic.setOrigin(0.5);
        this.clientGameState.buildingGraphics.push(bg);

        
    }
    OpenNameCityModal(city) {
        //show modal
        this.clientGameState.CurrentlySelectedCity = city;
        console.log("Show dialog in BuildCity")
        $("#modalCityName").modal('show');
        $("#modalCityName #inpCityName").val(city.name);
        $("#modalCityName #btnCityNameSubmit").off()
        $("#modalCityName #btnCityNameSubmit").click(this.NameCityEvent)
        setTimeout(function () {
            $("#modalCityName #inpCityName")[0].select();
            $("#modalCityName #inpCityName")[0].focus();
        }, 500);
    }
    NameCityEvent() {
        gameManager.NameCity();
    }
    NameCity() {
        var newCityName = $("#modalCityName #inpCityName").val();
        this.gameHub.CallNameCity(this.clientGameState.CurrentlySelectedCity,newCityName)
    }
    ChangeCityName(city) {
        console.log(city);
        console.log(this.clientGameState.buildingGraphics.filter(x => { return x.id === city.id }))
        var bg = this.clientGameState.buildingGraphics.filter(x => { return x.id === city.id })[0];
        console.log(bg);
        console.log(bg.labelGraphic);
        bg.labelGraphic.destroy();
        bg.labelGraphic = this.phaserState.add.text(city.tile.xMid, city.tile.yMid + 20, city.name, { fontFamily: '"Times New Roman", Times, serif', fontSize: '20px', fill: '#000' });
        bg.labelGraphic.setOrigin(0.5);
    }
    //UI Functions
    InitializeCityPlacement() {
        var PlaceYourCityText = this.phaserState.add.text(this.phaserGame.config.width / 2,
            this.phaserGame.config.height / 2,
            "Place Your City...",
            { fontFamily: '"Times New Roman", Times, serif', fontSize: '50px', fill: '#000000', backgroundColor:'#aaaaaa' });
        PlaceYourCityText.setOrigin(0.5);
        //this.clientGameState.PlaceYourCityText.setAlpha(0.8);
        var tween = this.phaserState.tweens.add({
            targets: PlaceYourCityText,
            alpha: 0,
            duration: 2000,
            ease: "Linear",
            delay: 5000
        }, this.phaserState);
        gameManager.phaserGame.map.on('pointerup', function (pointer) {
            gameManager.PlaceCity(pointer);
            gameManager.phaserGame.map.off('pointerup');
        });
    }
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