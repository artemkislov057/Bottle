using Bottle.Models.DataBase;
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

        public UserModel(User user, Rating rating)
        {
            if (user == null)
                return;
            Id = user.Id;
            Nickname = user.UserName;
            Rating = rating;
            Sex = user.Sex;
            IsCommercial = user.IsCommercial;
            CommercialData = user.IsCommercial && user.CommercialData != null ? new CommercialModel(user.CommercialData) : null;
        }

        public string Id { get; set; }
        public string Nickname { get; set; }
        public Rating Rating { get; set; }
        public string Sex { get; set; }
        public bool IsCommercial { get; set; }
        public CommercialModel CommercialData { get; set; }
    }
}
