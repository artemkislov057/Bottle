using Bottle.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bottle.Utilities
{
    public class MyDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public MyDbContext()
        {
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(
                "server=26.146.242.167;user=root;password=root;database=usersdb;",
                new MySqlServerVersion(new Version(7, 4, 16))
            );
        }

        public void RegisterUser(string login, string password)
        {
            Users.Add(new User { Login = login, Password = password });
            this.SaveChanges();
        }

        public List<User> GetAllData()
        {
            var names = this.Users
                .OrderBy(u => u.Login)
                .ToList();

            return names;
        }

        public bool IsAuthorized(string login, string password)
        {
            var users = Users.ToList();
            foreach (User u in users)
            {
                if (u.Login == login && u.Password == password)
                    return true;
            }
            return false;
        }
    }
}
