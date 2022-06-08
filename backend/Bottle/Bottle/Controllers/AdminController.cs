using Bottle.Models.DataBase;
using Bottle.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("api/admin")]
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly BottleDbContext db;
        private readonly UserManager<User> userManager;

        public AdminController(BottleDbContext db, UserManager<User> userManager)
        {
            this.db = db;
            this.userManager = userManager;
        }

        [HttpPost("make-admin/{id}")]
        public async Task<IActionResult> MakeUserAdminAsync([FromRoute] string id)
        {
            var user = db.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return BadRequest();
            }
            await userManager.AddToRoleAsync(user, "Admin");
            return Ok();
        }

        [HttpPost("make-moderator/{id}")]
        public async Task<IActionResult> MakeUserModeratorAsync([FromRoute] string id)
        {
            var user = db.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return BadRequest();
            }
            await userManager.AddToRoleAsync(user, "Moderator");
            return Ok();
        }
    }
}
