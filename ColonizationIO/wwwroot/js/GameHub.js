"use strict";
class GameHub {
    //Initialize

    constructor() {
        this.connection = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Information).withUrl("/gameHub").build();
        this.connection.start().then(function () {
            console.log("didthen?");
            gameManager.StartGameInitialization();
        }).catch(function (err) {
            console.log("Connection Failed: " + err.toString());
        });
        this.declareServerEvents();
    }
    //To Server
    SendMessage(message) {
        this.connection.invoke("SendMessage", message).catch(function (err) {
            console.log("Call Failed: " + err.toString());
        });
    }
    CallInitializeGameState() {
        this.connection.invoke("InitializeGameState").catch(function (err) {
            console.log("Call Failed: " + err.toString());
        });
    }
    CallPlaceBuilding(buildingType, selectedTile) {
        this.connection.invoke("BuildBuilding", buildingType, selectedTile).catch(function (err) {
            console.log("Call Failed: " + err.toString());
        });
    }


    //From Server
    declareServerEvents() {
        this.connection.on("ReceiveMessage", function (message) {
            console.log("Message from other clients:" + message);
        });
        this.connection.on("ReceiveGameState", function (gamestate) {
            gameManager.InitializeGameState(gamestate);
        });
        this.connection.on("RefreshGameState", function (gamestate) {

        })
        this.connection.on("BuildBuilding", function (buildingType, selectedTile, buildingID) {
            BuildBuilding(buildingType, selectedTile, buildingID);
        });
        this.connection.on("AddPlayer", function (player) {
            console.log(player);
            gameState.players.push(player);
        });

    }
}



