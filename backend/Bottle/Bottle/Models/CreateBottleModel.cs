using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Models
{
    public class CreateBottleModel
    {
        public string Coordinates { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public long LifeTime { get; set; }
    }
}
