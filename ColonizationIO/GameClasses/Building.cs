using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ColonizationIO.GameClasses
{
    public class Building
    {
        private static int NextID { get; set; }
        public int ID { get; set; }
        public string Name { get; set; }
        public string BuildingType { get; set; }
        public Tile Tile { get; set; }

        public static int GetNextID()
        {
            NextID += 1;
            return NextID;
        }

        public virtual void PerformTick()
        {
            //placeholder
        }
    }
}
