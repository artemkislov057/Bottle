using Microsoft.AspNetCore.Mvc;
using Bottle.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return Ok(DBConnection.db.GetAllData());
        }
    }
}
