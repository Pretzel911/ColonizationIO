using Microsoft.AspNetCore.CookiePolicy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ColonizationIO.GameClasses
{
    public class Tile
    {
        public decimal xIndex { get; set; }
        public decimal yIndex { get; set; }
        public decimal xStart { get; set; }
        public decimal yStart { get; set; }
        public decimal xEnd { get; set; }
        public decimal yEnd { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public string TileType { get; set; }
        public Building BuildingReference { get; set; }

        public decimal xMid 
        {
            get
            {
                return xStart + (Width / 2);
            } 
        }
        public decimal yMid
        {
            get
            {
                return yStart + (Height / 2);
            }
        }
    }
}
