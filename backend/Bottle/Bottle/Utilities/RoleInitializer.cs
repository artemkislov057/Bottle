using Bottle.Models.DataBase;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Utilities
{
    public class RoleInitializer
    {
        public static async Task InitializeAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }

            if (!await roleManager.RoleExistsAsync("Moderator"))
            {
                await roleManager.CreateAsync(new IdentityRole("Moderator"));
            }

            if (await userManager.FindByNameAsync("admin") == null)
            {
                User user = new User { Email = "admin@mail.ru", UserName = "admin", Sex = "attack helicopter", IsCommercial = false, AvatarId = 1, MaxBottlesCount = 1 };
                if ((await userManager.CreateAsync(user, "admin")).Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "Admin");
                }
            }

            if (await userManager.FindByNameAsync("string") == null)
            {
                User user = new User { Email = "string@mail.ru", UserName = "string", Sex = "attack helicopter", IsCommercial = false, AvatarId = 1, MaxBottlesCount = 1 };
                await userManager.CreateAsync(user, "string");
            }
        }
    }
}
