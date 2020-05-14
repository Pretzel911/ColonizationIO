function BuildBuilding(buildingType, selectedTile, buildingID) {
    var bg = new BuildingGraphic();
    bg.tile = selectedTile;
    bg.buildingType = buildingType;
    bg.id = buildingID;
    console.log("yo");
    console.log(selectedTile.xMid);
    console.log(selectedTile.yMid);
    console.log(buildingType);
    bg.graphic = gameState.state.physics.add.image(selectedTile.xMid, selectedTile.yMid, buildingType);
    console.log("yo2");
    gameState.buildingGraphics.push(bg);
}