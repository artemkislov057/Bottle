using System;

namespace Bottle.Models
{
    public class Bottle
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public string Coordinates { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public long LifeTime { get; set; }
        public DateTime Created { get; set; }
        public bool Active { get; set; }
    }
}