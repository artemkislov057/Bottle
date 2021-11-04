using Bottle.Models.Database;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
            if (user.Type == 2)
                user.CommercialData = CommercialDatas.FirstOrDefault(d => d.Id == user.Id);
            return user;
        }

        public Models.Database.Bottle GetBottle(int id)
        {
            return Bottles.FirstOrDefault(b => b.Id == id);
        }

        public Models.Database.Dialog GetDialog(int id)
        {
            return Dialogs.FirstOrDefault(b => b.Id == id);
        }

        public void SetUserRate(string id, int value)
        {
            var user = GetUser(id);
            user.Rate(value);
        }
    }
}
