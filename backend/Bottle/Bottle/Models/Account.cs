using Bottle.Models.DataBase;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Models
{
    public class Account
    {
        public Account()
        {

        }

        public Account(User user, Rating rating)
        {
            if (user == null)
                return;
            Id = user.Id;
            Nickname = user.UserName;
            Email = user.Email;
            Rating = rating;
            Sex = user.Sex;
            IsCommercial = user.IsCommercial;
            RemainingBottlesCount = user.IsCommercial ? user.RemainingBottlesCount : null;
            CommercialData = user.CommercialData is null ? null : new CommercialModel(user.CommercialData);
        }

        public Account(User user, CommercialData commercialData, Rating rating) : this(user, rating)
        {
            CommercialData = commercialData is null ? null : new CommercialModel(commercialData);
        }

        public string Id { get; set; }
        public string Nickname { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public Rating Rating { get; set; }
        public string Sex { get; set; }
        public bool IsCommercial { get; set; }
        public int? RemainingBottlesCount { get; set; }
        public CommercialModel CommercialData { get; set; }
    }
}
