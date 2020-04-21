﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ColonizationIO.GameClasses
{
    public class Player
    {
        public string Name { get; set; }
        public int MaxCities { get; set; }
        public List<Building> Buildings;

        public Player()
        {
            Name = "Player1";
            MaxCities = 1;
        }
    }
}
