using Bottle.Models;
using Bottle.Utilities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private BottleDbContext db;
        public AccountController(BottleDbContext dbContext)
        {
            this.db = dbContext;
        }

        /// <summary>
        /// Зарегистрировать пользователя
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     {
        ///         "nickname": "artem",
        ///         "password": "pass",
        ///         "email": "artem@gmai.com",
        ///         "sex": "mail",
        ///         "type": 0
        ///     }
        /// 
        /// </remarks>
        /// <returns></returns>
        /// <response code="201">Пользователь зарегистрирован</response>
        /// <response code="400">Пользователь с таким никнеймом или почтой уже существует или данные некорректные</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterUser([FromBody] RegistrationUserModel data)
        {
            if (ModelState.IsValid)
            {
                User user = db.Users.FirstOrDefault(u => u.Nickname == data.Nickname || u.Email == data.Email);
                if (user == null)
                {
                    user = new User { Nickname = data.Nickname, Email = data.Email, Password = data.Password, Sex = data.Sex, Type = data.Type };
                    db.Users.Add(user);
                    await db.SaveChangesAsync();
                    await Authenticate(user);
                    return Created(string.Empty, user);
                }
                else
                {
                    return BadRequest("Аккаунт с такой почтой или никнеймом уже существует");
                }
            }
            return BadRequest("Некорректные данные");
        }

        /// <summary>
        /// Войти в аккаунт
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel data)
        {
            if (ModelState.IsValid && !(string.IsNullOrEmpty(data.Nickname) && string.IsNullOrEmpty(data.Email)))
            {
                User user = db.Users.FirstOrDefault(u => u.Nickname == data.Nickname || u.Email == data.Email);
                if (user != null)
                {
                    if (user.Password != data.Password) return BadRequest("Неправильный пароль");
                    await Authenticate(user);
                    return Json(user);
                }
            }
            return BadRequest("Некорректные данные");
        }

        /// <summary>
        /// Выйти из аккаунта
        /// </summary>
        /// <returns></returns>
        [HttpGet("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

        /// <summary>
        /// Получить информацию о пользователе
        /// </summary>
        /// <param name="fields">Поля, которые надо получить. Если ничего не присваивать, в результате будут все поля.</param>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        public IActionResult GetInformation(string[] fields = null)
        {
            return Json(db.Users.FirstOrDefault(u => u.Nickname == HttpContext.User.Identity.Name));
        }

        /// <summary>
        /// Изменить данные пользователя
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPatch]
        [Authorize]
        public IActionResult ChangeInformation([FromBody] User data)
        {
            return StatusCode(501);
        }

        /// <summary>
        /// Удалить пользователя
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteUser()
        {
            User user = db.Users.FirstOrDefault(u => u.Nickname == User.Identity.Name);
            db.Users.Remove(user);
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            await db.SaveChangesAsync();
            return Ok();
        }

        private async Task Authenticate(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Nickname)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}
