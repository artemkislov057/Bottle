using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Models
{
    public class RegistrationUserModel
    {
        [Required]
        public string Nickname { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Sex { get; set; }

        [Required]
        public int Type { get; set; }
    }
}
