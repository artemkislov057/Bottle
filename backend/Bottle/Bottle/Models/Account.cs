﻿using Bottle.Models.Database;
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

        public Account(User user)
        {
            Id = user.Id;
            Nickname = user.UserName;
            Email = user.Email;
            if (user.RatingCount > 0)
                Rating = (decimal)user.RatingSum / user.RatingCount;
            Sex = user.Sex;
            Type = user.Type;
            CommercialData = user.CommercialData is null ? null : new CommercialModel(user.CommercialData);
            IsConfirmed = user.IsConfirmed();
        }

        public Account(User user, CommercialData commercialData) : this(user)
        {
            CommercialData = commercialData is null ? null : new CommercialModel(commercialData);
        }

        public string Id { get; set; }
        public string Nickname { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public decimal Rating { get; set; }
        public string Sex { get; set; }
        public int Type { get; set; }
        public CommercialModel CommercialData { get; set; }
        public bool IsConfirmed { get; set; }
    }
}
