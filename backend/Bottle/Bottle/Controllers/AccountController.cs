﻿using Bottle.Models;
using Bottle.Models.Database;
using Bottle.Utilities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("api/account")]
    [Authorize]
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
        ///         "email": "artem@gmail.com",
        ///         "sex": "male",
        ///         "type": 1
        ///     }
        /// 
        /// </remarks>
        /// <returns></returns>
        /// <response code="201">Пользователь зарегистрирован</response>
        /// <response code="400">Пользователь с таким никнеймом или почтой уже существует или данные некорректные</response>
        [HttpPost]
        [AllowAnonymous]
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
                    return Created(string.Empty, new Account(user));
                }
                else
                {
                    return BadRequest("Аккаунт с такой почтой или никнеймом существует");
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
        [AllowAnonymous]
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
        public IActionResult GetInformation(string[] fields = null)
        {
            var user = db.GetUser(User.Identity.Name);
            return Json(new Account(user));
        }

        /// <summary>
        /// Изменить данные пользователя
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPatch]
        public IActionResult ChangeInformation([FromBody] User data)
        {
            return StatusCode(501);
        }

        /// <summary>
        /// Удалить пользователя
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeleteUser()
        {
            User user = db.GetUser(User.Identity.Name);
            db.Users.Remove(user);
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("avatar")]
        public IActionResult ChangeAvatar(IFormFile file)
        {
            if (file == null) return BadRequest();
            byte[] imageData = null;
            using (var binaryReader = new BinaryReader(file.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)file.Length);
            }
            var user = db.GetUser(User.Identity.Name);
            user.Avatar = imageData;
            db.SaveChanges();
            return Ok();
        }

        [HttpGet("avatar")]
        public IActionResult GetAvatar()
        {
            var user = db.GetUser(User.Identity.Name);
            return File(user.Avatar, "image/jpg");
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