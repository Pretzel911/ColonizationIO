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
            var gs = new GameState();
            await Clients.Client(Context.ConnectionId).SendAsync("ReceiveGameState", gs);
        }
        public async Task BuildBuilding(string BuildingName, Tile SelectedTile)
        {
            //update game state
            await Clients.All.SendAsync("BuildBuilding", BuildingName, SelectedTile, 1);
        }
    }
}
