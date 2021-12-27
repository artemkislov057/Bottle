using Bottle.Models;
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
        private BottleDbContext db;
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
            //await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            //return Ok();
            await signInManager.SignOutAsync();
            return Ok();
        }

        /// <summary>
        /// Получить информацию о пользователе
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(403)]
        public IActionResult GetInformation()
        {
            var user = db.GetUser(User.Identity.Name);
            return Ok(new Account(user));
        }

        /// <summary>
        /// Получить аватар пользователя
        /// </summary>
        [HttpGet("avatar")]
        [ProducesResponseType(200)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public IActionResult GetAvatar()
        {
            var user = db.GetUser(User.Identity.Name);
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
                //User user = db.Users.FirstOrDefault(u => u.Nickname == data.Nickname || u.Email == data.Email);
                //if (user == null)
                //{
                //    user = new User { Nickname = data.Nickname, Email = data.Email, Password = data.Password, Sex = data.Sex };
                //    if (data.CommercialData == null)
                //    {
                //        user.Type = 1;
                //    }
                //    else
                //    {
                //        user.Type = 2;
                //        user.CommercialData = new CommercialData(data.CommercialData);
                //    }
                //    db.Users.Add(user);
                //    await db.SaveChangesAsync();
                //    await Authenticate(user);
                //    return Created(string.Empty, new Account(user));
                //}
                //else
                //{
                //    return BadRequest("Аккаунт с такой почтой или никнеймом существует");
                //}
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
                //User user = db.Users.FirstOrDefault(u => u.Nickname == data.Nickname || u.Email == data.Email);
                //if (user != null)
                //{
                //    if (user.Password != data.Password)
                //        return BadRequest("Неправильный пароль");
                //    await Authenticate(user);
                //    var cd = db.CommercialDatas.FirstOrDefault(d => d.Id == user.Id);
                //    return Ok(new Account(user, cd));
                //}
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
                        var cd = db.CommercialDatas.FirstOrDefault(d => d.Id == user.Id);
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
                var externalProviderUser = ExternalProviderUser.GetProvider(model.Provider);
                if (await externalProviderUser.CheckAuthorizeAsync(model.ProviderId, model.AccessToken))
                {
                    var user = db.Users.FirstOrDefault(u => u.Provider != null && u.ProviderId == model.ProviderId);
                    if (user == null)
                    {
                        user = new User { Email = model.RegistrationModel.Email, UserName = model.RegistrationModel.Nickname, Sex = model.RegistrationModel.Sex , Provider = model.Provider, ProviderId = model.ProviderId };
                        if (model.RegistrationModel.CommercialData == null)
                        {
                            user.Type = 1;
                        }
                        else
                        {
                            user.Type = 2;
                            user.CommercialData = new CommercialData(model.RegistrationModel.CommercialData);
                        }
                        var result = await userManager.CreateAsync(user);
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
        public IActionResult ChangeAvatar(IFormFile file)
        {
            if (file == null)
                return BadRequest();
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

        /// <summary>
        /// Изменить данные пользователя
        /// </summary>
        [HttpPatch]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public IActionResult ChangeInformation([FromBody] Account data)
        {
            if (ModelState.IsValid)
            {
                var user = db.GetUser(User.Identity.Name);
                user.UserName = data.Nickname is null ? user.UserName : data.Nickname;
                user.Sex = data.Sex is null ? user.Sex : data.Sex;
                if (user.Type == 2)
                {
                    user.CommercialData.FullName = data.CommercialData.FullName is null ? user.CommercialData.FullName : data.CommercialData.FullName;
                    user.CommercialData.Company = data.CommercialData.Company is null ? user.CommercialData.Company : data.CommercialData.Company;
                    user.CommercialData.IdentificationNumber = data.CommercialData.IdentificationNumber is null ? user.CommercialData.IdentificationNumber : data.CommercialData.IdentificationNumber;
                    user.CommercialData.PSRN = data.CommercialData.PSRN is null ? user.CommercialData.PSRN : data.CommercialData.PSRN;
                }
                db.SaveChanges();
                return Ok(new Account(user));
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
            User user = db.GetUser(User.Identity.Name);
            db.Users.Remove(user);
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("external-providers")]
        [AllowAnonymous]
        public IActionResult GetExternalProviders()
        {
            return Ok(Enum.GetValues<ExternalProvider>().ToDictionary(v => v));
        }





        //private async Task Authenticate(User user)
        //{
        //    var claims = new List<Claim>
        //    {
        //        new Claim(ClaimsIdentity.DefaultNameClaimType, user.Id.ToString())
        //    };
        //    ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
        //    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        //}
    }
}
