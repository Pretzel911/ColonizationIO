using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ColonizationIO.GameClasses;
using Microsoft.AspNetCore.SignalR;

namespace ColonizationIO.Server
{
    public class GameHub : Hub
    {
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
                gs = new GameState();
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
            //update game state
            await Clients.All.SendAsync("BuildBuilding", BuildingType, SelectedTile, 1);
        }
    }
}
