using Bottle.Controllers;
using Bottle.Models;
using Bottle.Models.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Utilities
{
    public class BottleDbContext : DbContext
    {
        public BottleDbContext(DbContextOptions<BottleDbContext> options) : base(options)
        {
            if (Database.EnsureCreated())
            {
                UserTypes.Add(new UserType { Type = "DefaultUser" });
                UserTypes.Add(new UserType { Type = "Commercial" });
                Users.Add(new User { Nickname = "Admin", Password = "Admin", Email = "Admin@admin.ru", Sex = "атакующий вертолетик", Type = 1 });
                SaveChanges();
            }
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserRating> UserRating { get; set; }
        public DbSet<CommercialData> CommercialDatas { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Dialog> Dialogs { get; set; }
        public DbSet<Models.DataBase.Bottle> Bottles { get; set; }
        public DbSet<BottleContent> BottleContents { get; set; }
        public DbSet<ContentType> ContentTypes { get; set; }

        public User GetUser(string id)
        {
            var user = Users.FirstOrDefault(u => u.Id.ToString() == id);
            if (user == null)
                return null;
            var cd = CommercialDatas.FirstOrDefault(d => d.Id == user.Id);
            return user;
        }

        public async Task<Models.DataBase.Bottle> GetBottle(int id)
        {
            var result = Bottles.FirstOrDefault(b => b.Id == id);
            if (result == null)
                return null;
            if (result.Active && result.EndTime <= DateTime.UtcNow)
            {
                await WebSocketController.OnTimeoutBottle(new(result));
                Bottles.Remove(result);
                SaveChanges();
                return null;
            }
            return result;
        }

        public async Task<DbSet<Models.DataBase.Bottle>> GetBottles()
        {
            var timeoutBottles = Bottles.Where(b => b.Active && b.EndTime <= DateTime.UtcNow);
            await WebSocketController.OnTimeoutBottles(timeoutBottles.Select(b => new Models.BottleModel(b)));
            Bottles.RemoveRange(timeoutBottles);
            SaveChanges();
            return Bottles;
        }

        public Dialog GetDialog(int id)
        {
            return Dialogs.FirstOrDefault(b => b.Id == id);
        }

        public Message GetLastMessage(Dialog dialog)
        {
            var dialogMessages = Messages.Where(m => m.DialogId == dialog.Id);
            if (dialogMessages.Any())
            {
                var id = dialogMessages.Max(m => m.Id);
                return dialogMessages.FirstOrDefault(m => m.Id == id);
            }
            return null;
        }

        public void SetUserRate(string id, int value)
        {
            var user = GetUser(id);
            if (User.IsValidRating(value))
            {
                UserRating.Add(new UserRating { DateTime = DateTime.UtcNow, User = user, Value = value });
            }
            SaveChanges();
        }

        public Rating GetUserRating(string id)
        {
            var dict = GetUserRatingDictionary(id);
            var sum = 0;
            var count = 0;
            foreach (var e in dict)
            {
                sum += e.Key * e.Value;
                count += e.Value;
            }
            if (count == 0)
                return Rating.Zero;
            return new Rating { Dict = dict, Value = (decimal)sum / count };
        }

        private Dictionary<int, int> GetUserRatingDictionary(string id)
        {
            var userRating = UserRating.Where(r => r.UserId.ToString() == id);
            var possibleValues = new[] { 1, 2, 3, 4, 5 };
            var result = new Dictionary<int, int>();
            foreach (var e in possibleValues)
            {
                result[e] = userRating.Count(r => r.Value == e);
            }
            return result;
        }
    }
}
