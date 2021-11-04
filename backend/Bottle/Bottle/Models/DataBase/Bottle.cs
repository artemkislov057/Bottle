using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bottle.Models.Database
{
    public class Bottle
    {

        public Bottle()
        {
            
        }

        public Bottle(CreateBottleModel createBottleModel, User user) : this()
        {
            Lat = createBottleModel.Lat;
            Lng = createBottleModel.Lng;
            Title = createBottleModel.Title;
            Description = createBottleModel.Description;
            Category = createBottleModel.Category;
            LifeTime = createBottleModel.LifeTime;
            Created = DateTime.Now;
            Active = true;
            User = user;
        }

        public int Id { get; set; }

        [Column(TypeName = "decimal(18, 15)")]
        public decimal Lat { get; set; }

        [Column(TypeName = "decimal(18, 15)")]
        public decimal Lng { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public long LifeTime { get; set; }
        public DateTime Created { get; set; }
        public bool Active { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public List<Dialog> Dialogs { get; set; }
        public List<BottleContent> BottleContents { get; set; }
    }
}