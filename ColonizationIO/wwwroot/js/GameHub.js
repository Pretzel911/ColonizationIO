"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/gameHub").build();

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
connection.on("BuildBuilding", function (buildingName, selectedTile, buildingID) {

});