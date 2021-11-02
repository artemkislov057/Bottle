using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bottle.Models.Database
{
    public class User
    {
        public int Id { get; set; }
        public string Nickname { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int RatingSum { get; set; }
        public int RatingCount { get; set; }
        public byte[] Avatar { get; set; }
        public string Sex { get; set; }
        public int Type { get; set; }

        [ForeignKey("Type")]
        public UserType UserType { get; set; }
        public CommercialData CommercialData { get; set; }
    }
}