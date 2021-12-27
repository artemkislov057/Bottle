using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bottle.Models.Database
{
    public class User : IdentityUser
    {
        //public string Nickname { get; set; }
        //public string Password { get; set; }
        public int RatingSum { get; set; }
        public int RatingCount { get; set; }
        public byte[] Avatar { get; set; }
        public string Sex { get; set; }
        public int Type { get; set; }
        public ExternalProvider? Provider { get; set; }
        public string ProviderId { get; set; }

        [ForeignKey("Type")]
        public UserType UserType { get; set; }
        public CommercialData CommercialData { get; set; }

        public void Rate(int value)
        {
            if (IsValidRating(value))
            {
                RatingSum += value;
                RatingCount++;
            }
        }

        public static bool IsValidRating(int value)
        {
            return value >= 0 && value <= 5;
        }
    }
}