using Bottle.Models;
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
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<CommercialData> CommercialDatas { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Dialog> Dialogs { get; set; }
        public DbSet<Models.Bottle> Bottles { get; set; }
        public DbSet<BottleContent> BottleContents { get; set; }
        public DbSet<ContentType> ContentTypes { get; set; }
    }
}
