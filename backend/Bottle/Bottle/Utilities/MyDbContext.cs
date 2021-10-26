using Bottle.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Bottle.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext() : this("BottlesDb.mdf") { }

        public MyDbContext(string path)
        {
            Path = path;
            connectionString = "Server = localhost\\SQLEXPRESS01; Database = master; Trusted_Connection = True";
            //"Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\" + path + ";Integrated Security=True";
            Database.EnsureCreated();
        }

        public readonly string Path;
        private string connectionString;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString);
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<CommercialData> CommercialDatas { get; set; }
        public virtual DbSet<UserType> UserTypes { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<Dialog> Dialogs { get; set; }
        public virtual DbSet<Bottle> Bottles { get; set; }
        public virtual DbSet<BottleContent> BottleContents { get; set; }
        public virtual DbSet<ContentType> ContentTypes { get; set; }
    }
}
