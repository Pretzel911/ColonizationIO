"use strict";

var connection;

function connectWithURL(URLCode) {
    connection = new signalR.HubConnectionBuilder().withUrl("/" + URLCode).build();

    connection.on("ReceiveMessage", function (message) {
        console.log("Message from other clients:" + message);
    });

    connection.start().then(function () {
        console.log("Connection Started?");
    }).catch(function (err) {
        console.log("Connection Failed: " + err.toString());
    });
}

function SendMessage(message) {
    connection.invoke("SendMessage", message).catch(function (err) {
        console.log("Call Failed: " + err.toString());
    });
}