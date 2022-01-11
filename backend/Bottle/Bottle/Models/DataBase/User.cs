using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bottle.Models.DataBase
{
    public class User
    {
        public int Id { get; set; }
        public string Nickname { get; set; }
        public string Password { get; set; }
        public List<UserRating> UserRating { get; set; }
        public string Email { get; set; }
        public byte[] Avatar { get; set; }
        public string Sex { get; set; }
        public int Type { get; set; }

        [ForeignKey("Type")]
        public UserType UserType { get; set; }
        public CommercialData CommercialData { get; set; }

        public static bool IsValidRating(int value)
        {
            return value >= 0 && value <= 5;
        }
    }
}