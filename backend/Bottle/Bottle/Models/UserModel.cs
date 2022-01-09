using Bottle.Models.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Models
{
    public class UserModel
    {
        public UserModel()
        {

        }

        public UserModel(User user)
        {
            if (user == null)
                return;
            Id = user.Id;
            Nickname = user.Nickname;
            if (user.RatingCount > 0)
                Rating = (decimal)user.RatingSum / user.RatingCount;
            Sex = user.Sex;
            Type = user.Type;
            CommercialData = user.CommercialData is null ? null : new CommercialModel(user.CommercialData);
        }

        public UserModel(User user, CommercialData commercialData) : this(user)
        {
            CommercialData = commercialData is null ? null : new CommercialModel(commercialData);
        }

        public int Id { get; set; }
        public string Nickname { get; set; }
        public decimal Rating { get; set; }
        public string Sex { get; set; }
        public int Type { get; set; }
        public CommercialModel CommercialData { get; set; }
    }
}
