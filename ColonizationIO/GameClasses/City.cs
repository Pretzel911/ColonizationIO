using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;

namespace ColonizationIO.GameClasses
{
    public class City : Building
    {
        public int Population { get; set; }
        public int FoodReserve { get; set; }
        public string GrowthRate { get; set; }

        public List<Farm> ResourceBuildings;

        public City()
        {
            BuildingType = "BuildingCity";
            Population = 0;
            FoodReserve = 0;
            GrowthRate = "standard";
        }
        public City(Tile tile, string name)
        {
            Name = name;
            Tile = tile;
            BuildingType = "BuildingCity";
            Population = 0;
            FoodReserve = 0;
            GrowthRate = "standard";
        }
        public void PerformTick()
        {
            CollectResources();
            PerformPopulationGrowth();
        }
        public void CollectResources()
        {
            for (int i = 0; i < ResourceBuildings.Count; i++)
            {
                FoodReserve += ResourceBuildings[i].FoodReserve;
                ResourceBuildings[i].FoodReserve = 0;
            }
        }
        public void PerformPopulationGrowth()
        {
            double foodReserveForCalculation = FoodReserve;
            double populationForCalculation = Population;
            switch (this.GrowthRate.ToLower())
            {
                case "meager":
                    if (foodReserveForCalculation >= .5 * (populationForCalculation))
                    {
                        foodReserveForCalculation -= .5 * (populationForCalculation);
                        populationForCalculation += populationForCalculation * (0.02);
                    }
                    else
                    {
                        populationForCalculation = populationForCalculation - (.05 * ((.5 * populationForCalculation) - foodReserveForCalculation));
                        foodReserveForCalculation = 0;
                    }
                    break;
                case "abundant":
                    if (foodReserveForCalculation >= (2.5 * populationForCalculation))
                    {
                        foodReserveForCalculation -= 2.5 * (populationForCalculation);
                        populationForCalculation += populationForCalculation * (0.10);
                    }
                    else
                    {
                        populationForCalculation = populationForCalculation - (.05 * ((2.5 * populationForCalculation) - foodReserveForCalculation));
                        foodReserveForCalculation = 0;
                    }
                    break;
                case "standard":
                    if (foodReserveForCalculation >= (populationForCalculation))
                    {
                        foodReserveForCalculation -= populationForCalculation;
                        populationForCalculation += populationForCalculation * (0.05);
                    }
                    else
                    {
                        populationForCalculation = populationForCalculation - (.05 * ((populationForCalculation) - foodReserveForCalculation));
                        foodReserveForCalculation = 0;
                    }
                    break;
            }
            Population = Convert.ToInt32(Math.Round((double)populationForCalculation, MidpointRounding.ToZero));
            FoodReserve = Convert.ToInt32(Math.Round((double)foodReserveForCalculation, MidpointRounding.ToZero));
        }
        public void SetGrowthRate(int selectedGrowthRate)
        {
            if (selectedGrowthRate == 2)
            {
                this.GrowthRate = "meager";
            }
            else if (selectedGrowthRate == 3)
            {
                this.GrowthRate = "abundant";
            }
            else
            {
                this.GrowthRate = "standard";
            }
        }
    }
}
