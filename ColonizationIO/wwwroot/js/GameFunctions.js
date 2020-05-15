function BuildBuilding(buildingType, selectedTile, buildingID) {
    var bg = new BuildingGraphic();
    bg.tile = selectedTile;
    bg.buildingType = buildingType;
    bg.id = buildingID;
    bg.graphic = gameState.state.physics.add.image(selectedTile.xMid, selectedTile.yMid, buildingType);
    gameState.buildingGraphics.push(bg);
}