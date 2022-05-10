using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Models
{
    public class BottleCoordinatesModel
    {
        public decimal Lat { get; set; }
        public decimal Lng { get; set; }
        public string GeoObjectName { get; set; }
        public string Address { get; set; }
    }
}
