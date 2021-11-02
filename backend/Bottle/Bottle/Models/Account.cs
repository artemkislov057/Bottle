using Bottle.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Models
{
    public class Account
    {
        public Account(User user)
        {
            Id = user.Id;
            Nickname = user.Nickname;
            Email = user.Email;
            if (user.RatingCount > 0)
                Rating = (decimal)user.RatingSum / user.RatingCount;
            Sex = user.Sex;
            Type = user.Type;
        }

        public int Id { get; set; }
        public string Nickname { get; set; }
        public string Email { get; set; }
        public decimal Rating { get; set; }
        public string Sex { get; set; }
        public int Type { get; set; }

        //public List<Bottle> Bottles { get; set; }
        //public List<Dialog> Dialogs { get; set; }
        //public List<Message> Messages { get; set; }


        //public UserType UserType { get; set; }
        //public CommercialData CommercialData { get; set; }
    }
}
