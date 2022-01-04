﻿using Bottle.Models;
using Bottle.Models.Database;
using Bottle.Utilities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
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
        private readonly BottleDbContext db;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public AccountController(BottleDbContext dbContext, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.db = dbContext;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        /// <summary>
        /// Выйти из аккаунта
        /// </summary>
        [HttpPost("logout")]
        [ProducesResponseType(200)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }

        /// <summary>
        /// Получить информацию о пользователе
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> GetInformationAsync()
        {
            var a = HttpContext.User;
            var user = await userManager.GetUserAsync(HttpContext.User);
            var cd = db.CommercialData.FirstOrDefault(c => c.Id == user.Id);
            return Ok(new Account(user, cd));
        }

        /// <summary>
        /// Получить аватар пользователя
        /// </summary>
        [HttpGet("avatar")]
        [ProducesResponseType(200)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetAvatarAsync()
        {
            var user = await userManager.GetUserAsync(HttpContext.User);
            if (user.Avatar == null)
                return NotFound();
            return File(user.Avatar, "image/jpg");
        }

        /// <summary>
        /// Зарегистрировать пользователя
        /// </summary>
        /// <param name="data">Данные, необходимые для регистрации</param>
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> RegisterUser([FromBody] RegistrationUserModel data)
        {
            if (ModelState.IsValid)
            {
                User user = new User { Email = data.Email, UserName = data.Nickname, Sex = data.Sex };
                if (data.CommercialData == null)
                {
                    user.Type = 1;
                }
                else
                {
                    user.Type = 2;
                    user.CommercialData = new CommercialData(data.CommercialData);
                }
                var result = await userManager.CreateAsync(user, data.Password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "confirmed");
                    await signInManager.SignInAsync(user, false);
                    return Created(string.Empty, new Account(user));
                }
                else
                {
                    return BadRequest();
                }
            }
            return BadRequest("Некорректные данные");
        }

        /// <summary>
        /// Войти в аккаунт
        /// </summary>
        /// <param name="data">Данные, необходимые для входа в аккаунт</param>
        [HttpPost("login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel data)
        {
            if (ModelState.IsValid && !(string.IsNullOrEmpty(data.Nickname) && string.IsNullOrEmpty(data.Email)))
            {
                User user;
                if (data.Nickname != null)
                {
                    user = db.Users.FirstOrDefault(u => u.UserName == data.Nickname);
                }
                else
                {
                    user = db.Users.FirstOrDefault(u => u.Email == data.Email);
                }
                if (user != null)
                {
                    var result = await signInManager.PasswordSignInAsync(user.UserName, data.Password, data.RememberMe, false);
                    if (result.Succeeded)
                    {
                        var cd = db.CommercialData.FirstOrDefault(d => d.Id == user.Id);
                        return Ok(new Account(user, cd));
                    }
                }
            }
            return BadRequest("Некорректные данные");
        }

        /// <summary>
        /// Войти в аккаунт через внешнего провайдера
        /// </summary>
        [HttpPost("external-login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginAsync([FromBody] ExternalLoginModel model)
        {
            if (ModelState.IsValid)
            {
                var externalProvider = ExternalProviderUser.GetProvider(model.Provider);
                var externalUser = await externalProvider.CheckAuthorizeAsync(model.ProviderId, model.AccessToken);
                if (externalUser.IsAuthorize)
                {
                    var user = db.Users.FirstOrDefault(u => u.Provider != null && u.ProviderId == model.ProviderId);
                    if (user == null)
                    {
                        user = new User { Email = externalUser.Email, UserName = externalUser.Email, Provider = model.Provider, ProviderId = model.ProviderId, Type = 1 };

                        var result = await userManager.CreateAsync(user);
                        await userManager.AddToRoleAsync(user, "not-confirmed");
                        if (result.Succeeded)
                        {
                            await signInManager.SignInAsync(user, model.RememberMe);
                            return Created(string.Empty, new Account(user));
                        }
                    }
                    else
                    {
                        await signInManager.SignInAsync(user, model.RememberMe);
                        return Ok(new Account(user));
                    }
                }
            }
            return BadRequest();
        }

        /// <summary>
        /// Изменить аватар пользователя
        /// </summary>
        /// <param name="file">Загружаемое фото</param>
        [HttpPost("avatar")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> ChangeAvatarAsync(IFormFile file)
        {
            if (file == null)
                return BadRequest();
            byte[] imageData = null;
            using (var binaryReader = new BinaryReader(file.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)file.Length);
            }
            var user = await userManager.GetUserAsync(HttpContext.User);
            user.Avatar = imageData;
            db.SaveChanges();
            return Ok();
        }

        /// <summary>
        /// Изменить данные пользователя
        /// </summary>
        [HttpPatch]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> ChangeInformationAsync([FromBody] Account data)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.GetUserAsync(HttpContext.User);
                user.Sex = data.Sex is null ? user.Sex : data.Sex;
                if (user.Type == 2)
                {
                    user.CommercialData.FullName = data.CommercialData.FullName is null ? user.CommercialData.FullName : data.CommercialData.FullName;
                    user.CommercialData.Company = data.CommercialData.Company is null ? user.CommercialData.Company : data.CommercialData.Company;
                    user.CommercialData.IdentificationNumber = data.CommercialData.IdentificationNumber is null ? user.CommercialData.IdentificationNumber : data.CommercialData.IdentificationNumber;
                    user.CommercialData.PSRN = data.CommercialData.PSRN is null ? user.CommercialData.PSRN : data.CommercialData.PSRN;
                }
                db.SaveChanges();
                var account = new Account(user);
                if (account.IsConfirmed && (await userManager.GetRolesAsync(user)).Contains("not-confirmed"))
                {
                    await userManager.RemoveFromRoleAsync(user, "not-confirmed");
                    await userManager.AddToRoleAsync(user, "confirmed");
                    await signInManager.RefreshSignInAsync(user);
                }
                return Ok(account);
            }
            return BadRequest();
        }

        /// <summary>
        /// Удалить пользователя
        /// </summary>
        [HttpDelete]
        [ProducesResponseType(200)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> DeleteUser()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            await userManager.DeleteAsync(user);
            await signInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet("external-providers")]
        [AllowAnonymous]
        public IActionResult GetExternalProviders()
        {
            return Ok(Enum.GetValues<ExternalProvider>().ToDictionary(v => v));
        }
    }
}
