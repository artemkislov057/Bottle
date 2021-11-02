using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Models
{
    public class BottleModel
    {
        public BottleModel()
        {

        }

        public BottleModel(Bottle.Models.Database.Bottle entityBottle)
        {
            Id = entityBottle.Id;
            Coordinates = entityBottle.Coordinates;
            Title = entityBottle.Title;
            Category = entityBottle.Category;
            LifeTime = entityBottle.LifeTime;
            Created = entityBottle.Created;
            UserId = entityBottle.UserId;
        }

        public int Id { get; set; }
        public string Coordinates { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public long LifeTime { get; set; }
        public DateTime Created { get; set; }
        public int UserId { get; set; }
    }
}
