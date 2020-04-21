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
        List<Building> Buildings;
        List<List<Tile>> Tiles;

        int TilesXCount { get; set; }
        int TilesYCount { get; set; }
        int TilesWidth { get; set; }
        int TilesHeight { get; set; }
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
                Tiles[x] = new List<Tile>();
                for (int y = 0; y < TilesYCount; y++)
                {
                    Tiles[x][y] = new Tile();
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
