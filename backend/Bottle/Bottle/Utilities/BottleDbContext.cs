using Bottle.Controllers;
using Bottle.Models.Database;
using Microsoft.EntityFrameworkCore;
using System;
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
        public DbSet<CommercialData> CommercialDatas { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Dialog> Dialogs { get; set; }
        public DbSet<Models.Database.Bottle> Bottles { get; set; }
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

        public async Task<Models.Database.Bottle> GetBottle(int id)
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

        public async Task<DbSet<Models.Database.Bottle>> GetBottles()
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
            user.Rate(value);
        }
    }
}
