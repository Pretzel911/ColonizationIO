using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace ColonizationIO.GameClasses
{
    public class GameState
    {
        //map
        //menu
        //state
        public List<Building> Buildings { get; set; }
        public List<List<Tile>> Tiles { get; set; }
        public int TilesXCount { get; set; }
        public int TilesYCount { get; set; }
        public int TilesWidth { get; set; }
        public int TilesHeight { get; set; }
        public GameState()
        {
            TilesXCount = 32;
            TilesYCount = 36;
            TilesWidth = 60;
            TilesHeight = 30;
            GenerateTiles();
        }
        public void PerformTick()
        {
            for (int i = 0; i < Buildings.Count; i++)
            {
                Buildings[i].PerformTick();
            }
        }
        public void GenerateTiles()
        {
            Tiles = new List<List<Tile>>();
            for (int x = 0; x < TilesXCount; x++)
            {
                Tiles.Add(new List<Tile>());
                for (int y = 0; y < TilesYCount; y++)
                {
                    Tiles[x].Add(new Tile());
                    Tiles[x][y].xIndex = x;
                    Tiles[x][y].yIndex = y;
                    Tiles[x][y].xStart = x * TilesWidth;
                    Tiles[x][y].yStart = y * TilesHeight;
                    Tiles[x][y].xEnd = (x * TilesWidth) + TilesWidth;
                    Tiles[x][y].yEnd = (y * TilesHeight) + TilesHeight;
                    Tiles[x][y].Width = TilesWidth;
                    Tiles[x][y].Height = TilesHeight;
                    if (x == 0 || y == 0 || x == TilesXCount - 1 || y == -TilesYCount - 1)
                    {
                        Tiles[x][y].TileType = "Water";
                    }
                    else
                    {
                        Tiles[x][y].TileType = "Land";
                    }
                }
            }
        }
        public bool CheckCityExists()
        {
            for (int i = 0; i < Buildings.Count; i++)
            {
                if (Buildings[i].BuildingType == "BuildingCity")
                {
                    return true;
                }
            }
            return false;//no cities!
        }
        public Building GetBuildingCity(Building building)
        {
            for (var i = 0; i < Buildings.Count; i++)
            {
                if (Buildings[i].BuildingType == "BuildingCity")
                {
                    return Buildings[i];
                }
            }
            return null;//no cities!
        }
    }
}
