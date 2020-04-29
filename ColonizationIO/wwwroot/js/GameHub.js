"use strict";

var connection = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Information).withUrl("/gameHub").build();

connection.on("ReceiveMessage", function (message) {
    console.log("Message from other clients:" + message);
});

connection.start().then(function () {
    StartGameInitialization();
}).catch(function (err) {
    console.log("Connection Failed: " + err.toString());
});

function SendMessage(message) {
    connection.invoke("SendMessage", message).catch(function (err) {
        console.log("Call Failed: " + err.toString());
    });
}
function CallInitializeGameState() {
    connection.invoke("InitializeGameState").catch(function (err) {
        console.log("Call Failed: " + err.toString());
    });
}
connection.on("ReceiveGameState", function (gamestate) {
    InitializeGame(gamestate)
});
connection.on("BuildBuilding", function (buildingType, selectedTile, buildingID) {
    var bg = new BuildingGraphic();
    bg.tile = selectedTile;
    bg.buildingType = buildingType;
    bg.id = buildingID;
    bg.graphic = gameState.state.physics.add.image(selectedTile.xMid, selectedTile.yMid, buildingType);
    gameState.buildingGraphics.push(bg);
});
connection.on("AddPlayer", function (player) {
    console.log(player)
    gameState.players.push(player);
}