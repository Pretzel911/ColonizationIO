using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ColonizationIO.GameClasses
{
    public class Building
    {
        public string Name { get; set; }
        public string BuildingType { get; set; }
        public Tile Tile { get; set; }

        public void PerformTick()
        {
            //placeholder
        }
    }
}
