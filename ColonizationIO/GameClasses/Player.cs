using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ColonizationIO.GameClasses
{
    public class Player
    {
        public string Name { get; set; }
        public string ClientID { get; set; }
        public int MaxCities { get; set; }
        public List<Building> Buildings;

        public Player()
        {
            MaxCities = 1;
        }
    }
}
