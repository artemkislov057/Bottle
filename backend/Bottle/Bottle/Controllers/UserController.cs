using Bottle.Models;
using Bottle.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("api/user")]
    [Authorize]
    public class UserController : Controller
    {
        private readonly BottleDbContext db;

        public UserController(BottleDbContext db)
        {
            this.db = db;
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var user = db.GetUser(id);
            if (user == null)
                return NotFound();
            return Ok(new UserModel(user, db.GetUserRating(id)));
        }

        [HttpGet("{id}/avatar")]
        public IActionResult GetAvatar(string id)
        {
            var user = db.GetUser(id);
            if (user?.Avatar == null)
                return NotFound();
            return File(user.Avatar, "image/jpg");
        }
    }
}
