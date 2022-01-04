using Bottle.Models;
using Bottle.Models.Database;
using Bottle.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Authorize(Roles = "confirmed")]
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
            var bottle = await db.GetBottle(bottleId);
            if (bottle != null)
            {
                return Ok(new BottleModel(bottle));
            }
            return BadRequest("bottle not found");
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
            var bottle = await db.GetBottle(bottleId);
            var user = await userManager.GetUserAsync(HttpContext.User);
            if (bottle == null || !bottle.Active || bottle.User == user)
                return BadRequest();
            bottle.Active = false;
            var dialog = new Dialog { BottleId = bottle.Id, BottleOwnerId = bottle.UserId, RecipientId = user.Id };
            db.Dialogs.Add(dialog);
            db.SaveChanges();
            bottle.DialogId = dialog.Id;
            db.SaveChanges();
            await WebSocketController.OnPickedUdBottle(new BottleModel(bottle));
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
                var bottle = new Models.Database.Bottle(data, user);
                db.Bottles.Add(bottle);
                db.SaveChanges();
                await WebSocketController.OnCreatingBottle(new BottleModel(bottle));
                return Created(string.Empty, new BottleModel(bottle));
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
            var bottle = await db.GetBottle(bottleId);
            var user = await userManager.GetUserAsync(HttpContext.User);
            if (bottle != null && bottle.Active && bottle.UserId == user.Id)
            {
                db.Bottles.Remove(bottle);
                db.SaveChanges();
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
            IEnumerable<Models.Database.Bottle> result = null;
            var bottles = (await db.GetBottles()).Where(b => b.Active);
            if (category != null)
                bottles = bottles.Where(b => b.Category == category);
            result = bottles;
            if (!(radius == null || lat == null || lng == null))
            {
                result = bottles.ToList().Where(b => IsPointInCircle(lat.Value, lng.Value, b.Lat, b.Lng, radius.Value));
            }
            return Ok(result.Select(b => new BottleModel(b)));
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
            return Ok(bottles.Select(b => new BottleModel(b)));
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
                await WebSocketController.OnTimeoutBottle(new(bottle));
                db.Bottles.Remove(bottle);
                db.SaveChanges();
                return Ok();
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
