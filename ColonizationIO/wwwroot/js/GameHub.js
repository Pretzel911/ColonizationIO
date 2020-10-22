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
        this.connection.invoke("SendMessage", message).catch(this.LogErrorOnCall);
    }
    CallInitializeGameState() {
        this.connection.invoke("InitializeGameState").catch(this.LogErrorOnCall);
    }
    CallPlaceBuilding(buildingType, selectedTile) {
        this.connection.invoke("BuildBuilding", buildingType, selectedTile).catch(this.LogErrorOnCall);
    }
    CallNameCity(oldCityName, newCityName) {
        this.connection.invoke("NameCity", oldCityName, newCityName).catch(this.LogErrorOnCall);
    }

    LogErrorOnCall(err) {
        console.log("Call Failed: " + err.toString());
    }

    //From Server
    declareServerEvents() {
        this.connection.on("ReceiveMessage", function (message) {
            console.log("Message from server:" + message);
        });
        this.connection.on("ReceiveGameState", function (gamestate) {
            gameManager.InitializeGameState(gamestate);
        });
        this.connection.on("RefreshGameState", function (gamestate) {

        })
        this.connection.on("BuildBuilding", function (buildingType, selectedTile, buildingID) {
            gameManager.BuildCity(buildingType, selectedTile, buildingID);
        });
        this.connection.on("NameCity", function (oldCityName, newCityName) {

        });
        this.connection.on("AddPlayer", function (player) {
            console.log(player);
            gameState.players.push(player);
        });

    }
}



