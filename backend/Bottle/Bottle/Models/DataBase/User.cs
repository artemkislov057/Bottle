using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bottle.Models.DataBase
{
    public class User : IdentityUser
    {
        public int RatingSum { get; set; }
        public int RatingCount { get; set; }
        public byte[] Avatar { get; set; }
        public int AvatarId { get; set; }
        public string AvatarContentType { get; set; }
        public string Sex { get; set; }
        public UserType Type { get; set; }
        public ExternalProvider? Provider { get; set; }
        public string ExternalUserId { get; set; }
        public CommercialData CommercialData { get; set; }
        public List<UserRating> UserRating { get; set; }

        public static bool IsValidRating(int value)
        {
            return value >= 0 && value <= 5;
        }
    }
}