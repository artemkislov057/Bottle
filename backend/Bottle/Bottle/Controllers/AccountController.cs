using Bottle.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        /// <summary>
        /// Регистрирует пользователя
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST /account
        ///     {
        ///         "id": 5,
        ///         "login": "artem",
        ///         "password": "krutoiparol"
        ///     }
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Пользователь зарегистрирован</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult RegisterUser([FromBody]User data)
        {
            return Ok($"Зарегистрирован пользователь\nid:{data.Id}\t");
        }

        [HttpDelete]
        public IActionResult DeleteUser()
        {
            return Ok("Удалён.");
        }

        [HttpGet]
        public IActionResult GetInformation(string fields = "")
        {
            return Ok("Информация о пользователе");
        }

        [HttpPatch]
        public IActionResult ChangeInformation()
        {
            return Ok("Изменён.");
        }
    }
}
