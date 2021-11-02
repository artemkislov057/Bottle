using System;
using System.Collections.Generic;

namespace Bottle.Models.Database
{
    public class Bottle
    {

        public Bottle()
        {
            
        }

        public Bottle(CreateBottleModel createBottleModel, User user) : this()
        {
            Coordinates = createBottleModel.Coordinates;
            Title = createBottleModel.Title;
            Category = createBottleModel.Category;
            LifeTime = createBottleModel.LifeTime;
            Created = DateTime.Now;
            Active = true;
            User = user;
        }

        public int Id { get; set; }
        public string Coordinates { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public long LifeTime { get; set; }
        public DateTime Created { get; set; }
        public bool Active { get; set; }

        public User User { get; set; }

        public List<Dialog> Dialogs { get; set; }
        public List<BottleContent> BottleContents { get; set; }
    }
}