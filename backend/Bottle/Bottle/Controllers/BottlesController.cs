using Bottle.Models;
using Bottle.Models.DataBase;
using Bottle.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Authorize]
    [Route("api/bottles")]
    public class BottlesController : Controller
    {
        private BottleDbContext db;
        private readonly UserManager<User> userManager;

        public BottlesController(BottleDbContext db, UserManager<User> userManager)
        {
            this.db = db;
            this.userManager = userManager;
        }

        /// <summary>
        /// Получить информацию о бутылочке
        /// </summary>
        /// <param name="bottleId">ID бутылочки</param>
        [HttpGet("{bottle-id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> GetInformation([FromRoute(Name = "bottle-id")] int bottleId)
        {
            var bottle = await db.GetBottleModelAsync(bottleId);
            return bottle == null ? BadRequest("bottle not found") : Ok(bottle);
        }

        /// <summary>
        /// Подобрать бутылочку
        /// </summary>
        /// <param name="bottleId">ID бутылочки</param>
        [HttpPost("{bottle-id}/pick-up")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> PickUp([FromRoute(Name = "bottle-id")] int bottleId)
        {
            var bottle = await db.GetBottleAsync(bottleId);
            var bottleUser = db.Users.FirstOrDefault(u => u.Id == bottle.UserId);
            var user = await userManager.GetUserAsync(HttpContext.User);
            if (bottle == null || !bottle.Active || bottleUser == user)
                return BadRequest();
            var hasDialogWithUser = db.Dialogs.Where(d => d.BottleId == bottle.Id)
                                              .Any(d => d.RecipientId == user.Id);
            if (hasDialogWithUser)
            {
                return BadRequest();
            }
            bottle.PickingUp++;
            if (!bottleUser.IsCommercial && bottle.PickingUp >= bottle.MaxPickingUp)
            {
                bottle.Active = false;
                await WebSocketController.OnPickedUdBottle(db.GetBottleModel(bottle));
            }
            var dialog = new Dialog { BottleId = bottle.Id, BottleOwnerId = bottle.UserId, RecipientId = user.Id };
            db.Dialogs.Add(dialog);
            db.SaveChanges();
            await WebSocketController.OnCreatingDialog(bottle.UserId.ToString(), new DialogModel(dialog));
            return Ok(new { dialogId = dialog.Id });
        }

        /// <summary>
        /// Создать бутылочку
        /// </summary>
        /// <param name="data">Данные, необходимые для создания бутылочки</param>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> Create([FromBody] CreateBottleModel data)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.GetUserAsync(HttpContext.User);
                var userBottlesCount = db.Bottles.Count(b => b.User == user);
                if (userBottlesCount >= user.MaxBottlesCount || !user.IsCommercial && data.MaxPickingUp > 10 || data.MaxPickingUp <= 0)
                {
                    return BadRequest();
                }
                var bottle = new Models.DataBase.Bottle(data, user);
                var maxLifeTime = user.IsCommercial ? 48 : 24;
                if (data.LifeTime <= 0 || data.LifeTime > TimeSpan.FromHours(maxLifeTime).TotalSeconds)
                    return BadRequest();
                bottle.MaxPickingUp = user.IsCommercial ? -1 : data.MaxPickingUp ?? 1;
                db.Bottles.Add(bottle);
                db.SaveChanges();
                if (data.ContentItemsCount == 0)
                    await WebSocketController.OnCreatingBottle(new BottleModel(bottle));
                return Created(string.Empty, new BottleModel(bottle));
            }
            return BadRequest();
        }

        [HttpPost("{bottle-id}/content")]
        [RequestSizeLimit(100 * 1024)]
        public async Task<IActionResult> LoadContentAsync(IFormFile file, [FromRoute(Name = "bottle-id")] int bottleId)
        {
            if (file == null)
            {
                return BadRequest();
            }
            byte[] data = null;
            using (var binaryReader = new BinaryReader(file.OpenReadStream()))
            {
                data = binaryReader.ReadBytes((int)file.Length);
            }
            var bottle = await db.GetBottleAsync(bottleId);
            var user = await userManager.GetUserAsync(User);
            if (bottle == null || bottle.UserId != user.Id)
            {
                return BadRequest();
            }
            var bottleContent = new BottleContent
            {
                BinaryValue = data,
                BottleId = bottle.Id,
                ContentType = file.ContentType
            };
            db.BottleContent.Add(bottleContent);
            db.SaveChanges();
            if (bottle.IsContentLoaded)
            {
                bottle.ContentItemsCount++;
                await WebSocketController.OnChangeBottle(db.GetBottleModel(bottle));
                return Ok();
            }
            var contentCount = db.BottleContent.Count(bc => bc.BottleId == bottle.Id);
            if (contentCount >= bottle.ContentItemsCount)
            {
                bottle.IsContentLoaded = true;
                await WebSocketController.OnCreatingBottle(db.GetBottleModel(bottle));
            }
            db.SaveChanges();
            return Ok();
        }

        [HttpGet("{bottle-id}/content/{content-id}")]
        public IActionResult GetContent([FromRoute(Name = "bottle-id")] int bottleId, [FromRoute(Name = "content-id")] int contentId)
        {
            var content = db.BottleContent.FirstOrDefault(bc => bc.BottleId == bottleId && bc.Id == contentId);
            if (content == null)
                return BadRequest();
            return File(content.BinaryValue, content.ContentType);
        }

        [HttpDelete("{bottle-id}/content/{content-id}")]
        public async Task<IActionResult> DeleteContentAsync([FromRoute(Name = "bottle-id")] int bottleId, [FromRoute(Name = "content-id")] int contentId)
        {
            var user = await userManager.GetUserAsync(HttpContext.User);
            var bottle = await db.GetBottleAsync(bottleId);
            var content = db.BottleContent.FirstOrDefault(bc => bc.BottleId == bottleId && bc.Id == contentId);
            if (bottle != null && content != null && bottle.UserId == user.Id && bottle.IsContentLoaded)
            {
                db.BottleContent.Remove(content);
                db.SaveChanges();
                await WebSocketController.OnChangeBottle(db.GetBottleModel(bottle));
                return Ok();
            }
            return BadRequest();
        }

        /// <summary>
        /// Удалить бутылочку
        /// </summary>
        /// <param name="bottleId">ID бутылочки</param>
        [HttpDelete("{bottle-id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> Delete([FromRoute(Name = "bottle-id")] int bottleId)
        {
            var bottle = await db.GetBottleAsync(bottleId);
            var user = await userManager.GetUserAsync(HttpContext.User);
            if (bottle != null && bottle.Active && bottle.UserId == user.Id)
            {
                var lat = bottle.Lat;
                var lng = bottle.Lng;
                db.Bottles.Remove(bottle);
                db.SaveChanges();
                await WebSocketController.OnDeleteBottle(bottleId, lat, lng);
                return Ok();
            }
            return BadRequest();
        }

        /// <summary>
        /// Получить бутылочки
        /// </summary>
        /// <param name="category">Категория бутылочки</param>
        /// <param name="radius">Радиус, в котором искать бутылочки(в км)</param>
        /// <param name="lat">Широта центра поиска бутылочек</param>
        /// <param name="lng">Долгота центра поиска бутылочек</param>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> GetBottles(string category = null, double? radius = null, decimal? lat = null, decimal? lng = null)
        {
            IEnumerable<Models.DataBase.Bottle> result = null;
            var bottles = (await db.GetBottles()).Where(b => b.Active && b.IsContentLoaded);
            if (category != null)
                bottles = bottles.Where(b => b.Category == category);
            result = bottles;
            if (!(radius == null || lat == null || lng == null))
            {
                result = bottles.ToList().Where(b => IsPointInCircle(lat.Value, lng.Value, b.Lat, b.Lng, radius.Value));
            }
            return Ok(result.ToList().Select(b => db.GetBottleModel(b)));
        }

        /// <summary>
        /// Получить свои бутылочки
        /// </summary>
        [HttpGet("my")]
        [ProducesResponseType(200)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> GetMyBottles()
        {
            var userId = userManager.GetUserId(HttpContext.User);
            var bottles = (await db.GetBottles()).Where(b => b.UserId == userId);
            return Ok(bottles.ToList().Select(b => db.GetBottleModel(b)));
        }

        /// <summary>
        /// Сообщить серверу о том, что срок годности бутылочки истёк
        /// </summary>
        /// <param name="bottleId">ID бутылочки</param>
        [HttpPost("{bottle-id}/timeout")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> BottleTimeout([FromRoute(Name = "bottle-id")] int bottleId)
        {
            var bottle = db.Bottles.FirstOrDefault(b => b.Id == bottleId);
            if (bottle != null && bottle.Active && bottle.EndTime <= DateTime.UtcNow)
            {
                await WebSocketController.OnTimeoutBottle(new BottleModel(bottle));
                db.Bottles.Remove(bottle);
                db.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("{bottle-id}/change")]
        public async Task<IActionResult> ChangeBottleAsync([FromRoute(Name = "bottle-id")] int bottleId, [FromBody] ChangeBottleModel model)
        {
            var bottle = await db.GetBottleAsync(bottleId);
            var user = await userManager.GetUserAsync(HttpContext.User);
            if (model == null || bottle == null || bottle.UserId != user.Id)
            {
                return BadRequest();
            }
            if (model.GeoObjectName != null) bottle.GeoObjectName = model.GeoObjectName;
            if (model.Address != null) bottle.Address = model.Address;
            if (model.Title != null) bottle.Title = model.Title;
            if (model.Description != null) bottle.Description = model.Description;
            if (model.Category != null) bottle.Category = model.Category;
            if (model.LifeTime != null)
            {
                var timeSpan = TimeSpan.FromSeconds((double)model.LifeTime);
                if (bottle.Created + timeSpan > DateTime.UtcNow) bottle.EndTime = bottle.Created + timeSpan;
            }
            if (model.MaxPickingUp != null && !user.IsCommercial)
            {
                if (model.MaxPickingUp > bottle.PickingUp)
                {
                    bottle.MaxPickingUp = (int)model.MaxPickingUp;
                }
                else
                {
                    bottle.MaxPickingUp = bottle.PickingUp;
                    bottle.Active = false;
                    await WebSocketController.OnPickedUdBottle(db.GetBottleModel(bottle));
                }
            }
            var bottleModel = db.GetBottleModel(bottle);
            await WebSocketController.OnChangeBottle(bottleModel);
            db.SaveChanges();
            return Ok(bottleModel);
        }

        [HttpPost("{bottle-id}/change-coordinates")]
        public async Task<IActionResult> ChangeBottleCoordinatesAsync([FromRoute(Name = "bottle-id")] int bottleId, [FromBody] BottleCoordinatesModel model)
        {
            if (ModelState.IsValid)
            {
                var bottle = await db.GetBottleAsync(bottleId);
                var user = await userManager.GetUserAsync(HttpContext.User);
                if (bottle == null || bottle.UserId != user.Id)
                {
                    return BadRequest();
                }
                var oldLat = bottle.Lat;
                var oldLng = bottle.Lng;
                bottle.Lat = model.Lat;
                bottle.Lng = model.Lng;
                if (model.GeoObjectName != null) bottle.GeoObjectName = model.GeoObjectName;
                if (model.Address != null) bottle.Address = model.Address;
                var bottleModel = db.GetBottleModel(bottle);
                await WebSocketController.OnChangeCoordinatesBottle(bottleId, oldLat, oldLng, model);
                db.SaveChanges();
                return Ok(bottleModel);
            }
            return BadRequest();
        }









        public static bool IsPointInCircle(decimal Lat1, decimal Lng1, decimal Lat2, decimal Lng2, double radius)
        {
            return GetDistanceFromLatLon(Lat1, Lng1, Lat2, Lng2) <= radius;
        }

        private static double GetDistanceFromLatLon(decimal lat1, decimal lon1, decimal lat2, decimal lon2)
        {
            const int R = 6371;
            var dLat = DegToRad(lat2 - lat1);
            var dLon = DegToRad(lon2 - lon1);
            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(DegToRad(lat1)) * Math.Cos(DegToRad(lat2)) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            var d = R * c;
            return d;
        }

        private static double DegToRad(decimal angle)
        {
            return (double)(angle * (decimal)Math.PI / 180);
        }
    }
}
