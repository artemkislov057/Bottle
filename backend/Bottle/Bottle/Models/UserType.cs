using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bottle.Models
{
    public class UserType
    {
        public int Id { get; set; }
        public string Type { get; set; }
    }
}
