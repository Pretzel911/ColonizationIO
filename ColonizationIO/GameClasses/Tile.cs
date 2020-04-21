using Microsoft.AspNetCore.CookiePolicy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ColonizationIO.GameClasses
{
    public class Tile
    {
        public double xIndex { get; set; }
        public double yIndex { get; set; }
        public double xStart { get; set; }
        public double yStart { get; set; }
        public double xEnd { get; set; }
        public double yEnd { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public string TileType { get; set; }
        public Building BuildingReference { get; set; }

        public double xMid()
        {
            return xStart + (Width / 2);
        }
        public double yMid()
        {
            return yStart + (Height / 2);
        }
    }
}
