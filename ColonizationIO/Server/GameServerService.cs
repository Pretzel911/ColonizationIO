using ColonizationIO.GameClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace ColonizationIO.Server
{
    public class GameServerService
    {
        private readonly System.Timers.Timer TickTimer = new System.Timers.Timer();
        private IHubContext<GameHub> HubContext { get; set; }
        public List<GameState> GameStates { get; set; }
        public GameServerService(IHubContext<GameHub> hubContext)
        {
            HubContext = hubContext;
            GameStates = new List<GameState>();
        }
        public void StartGameServerTick()
        {
            TickTimer.Interval = 5000;//5 seconds
            TickTimer.Elapsed += PerformTicks;
            TickTimer.Start();
        }
        async void PerformTicks(object sender, System.Timers.ElapsedEventArgs e)
        {
            foreach (var gs in GameStates)
            {
                gs.PerformTick();
            }
            await HubContext.Clients.All.SendAsync("ReceiveMessage", "Fucking what?");
        }
    }
}
