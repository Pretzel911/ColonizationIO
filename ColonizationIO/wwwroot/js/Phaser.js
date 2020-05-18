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
    gameManager.phaserGame.map = this.add.sprite(960, 540, 'MapMap').setInteractive();
    gameManager.phaserState = this;
    console.log("phasered?");
    CreateMenu();
    CreateTileHighlighter();
}