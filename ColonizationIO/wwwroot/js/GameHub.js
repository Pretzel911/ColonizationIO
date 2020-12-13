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
    CallConstructCity(buildingType, selectedTile) {
        this.connection.invoke("ConstructCity", buildingType, selectedTile).catch(this.LogErrorOnCall);
    }
    CallNameCity(city, newCityName) {
        this.connection.invoke("NameCity", city, newCityName).catch(this.LogErrorOnCall);
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
        this.connection.on("RefreshGameStateAfterTick", function (gamestate) {
            console.log("RefreshGameStateAfterTick");
            console.log(gamestate);
            gameManager.RefreshGameStateAfterTick(gamestate);
        })
        this.connection.on("PlaceCity", function (city) {
            console.log("CalledPlaceCity");
            gameManager.BuildCity(city);
        });
        this.connection.on("TriggerClientNameCity", function (city) {
            console.log("Called TriggerClientNameCity");
            gameManager.OpenNameCityModal(city);
        });
        this.connection.on("NameCity", function (city) {
            console.log("Called NameCity");
            gameManager.ChangeCityName(city);
        });
        this.connection.on("AddPlayer", function (player) {
            console.log("Player Added:");
            console.log(player);
            gameState.players.push(player);
        });

    }
}



