using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ColonizationIO.GameClasses
{
    public class Farm : Building
    {
        public int FoodReserve { get; set; }
        public decimal FoodProduction { get; set; }
        public City City { get; set; }

        public Farm()
        {
            FoodReserve = 0;
            FoodProduction = 0;
        }
        public Farm(City city)
        {
            City = city;
            FoodReserve = 0;
            FoodProduction = 0;
        }
        public void PerformTick()
        {
            ProduceFood();
        }
        public void ProduceFood()
        {
            FoodReserve += Convert.ToInt32(Math.Round(FoodProduction));
        }
    }
}
