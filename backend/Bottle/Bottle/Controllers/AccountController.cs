using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("/[controller]")]
    public class AccountController : Controller
    {
        [HttpPost]
        public IActionResult RegisterUser()
        {
            return Ok("Зарегистрирован.");
        }

        [HttpDelete]
        public IActionResult DeleteUser()
        {
            return Ok("Удалён.");
        }

        [HttpGet]
        public IActionResult GetInformation(string fields = "")
        {
            var arrValue = fields.Split(',');
            var result = new StringBuilder("{");
            foreach (var e in arrValue)
            {
                result.Append($"\"{e}\" : \"{e.Length}\",");
            }
            if (arrValue.Length > 0)
                result[result.Length - 1] = '}';
            return Ok(result.ToString());
        }

        [HttpPatch]
        public IActionResult ChangeInformation()
        {
            return Ok("Изменён.");
        }
    }
}
