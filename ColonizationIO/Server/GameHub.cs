﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ColonizationIO.GameClasses;
using Microsoft.AspNetCore.SignalR;

namespace ColonizationIO.Server
{
    public class GameHub : Hub
    {
        Microsoft.AspNetCore.Hosting.IWebHostEnvironment _webHostEnvironment;
        private GameServerService GameServer { get; set; }
        public GameHub(Microsoft.AspNetCore.Hosting.IWebHostEnvironment webHostEnvironment,GameServerService GameServer)
        {
            this.GameServer = GameServer;
            _webHostEnvironment = webHostEnvironment;
            this.GameServer.StartGameServerTick();
        }
        
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
        public async Task InitializeGameState()
        {
            GameState gs;
            if(GameServer.GameStates.Count>0)
            {
                gs = GameServer.GameStates[0];
            }
            else
            {
                gs = new GameState(_webHostEnvironment);
                GameServer.GameStates.Add(gs);
            }
            var player = new Player();
            player.Name = "Player " + (gs.Players.Count() + 1).ToString();
            player.ClientID = Context.ConnectionId;
            GameServer.GameStates[0].Players.Add(player);
            await Clients.Client(Context.ConnectionId).SendAsync("ReceiveGameState", gs);
            await Clients.Others.SendAsync("AddPlayer", player);
        }
        public async Task BuildBuilding(string BuildingType, Tile SelectedTile)
        {
            var gs=GameServer.GameStates.Where(x=>x.Players.Where(x=>x.ClientID==Context.ConnectionId).FirstOrDefault() !=null).FirstOrDefault();
            var building = new Building() { 
                BuildingType = BuildingType,
                Name = "Utopia",
                Tile = SelectedTile };
            gs.Buildings.Add(building);
            //update game state
            await Clients.All.SendAsync("BuildBuilding", BuildingType, SelectedTile, 1);
        }
    }
}
