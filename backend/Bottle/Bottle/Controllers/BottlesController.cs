using Bottle.Models;
using Bottle.Models.Database;
using Bottle.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Bottle.Controllers
{
    [Authorize]
    [Route("api/bottles")]
    public class BottlesController : Controller
    {
        private BottleDbContext db;
        public BottlesController(BottleDbContext db)
        {
            this.db = db;
        }

        /// <summary>
        /// Получить информацию о бутылочке
        /// </summary>
        /// <param name="bottleId"></param>
        /// <returns></returns>
        [HttpGet("{bottle-id}")]
        public IActionResult GetInformation([FromRoute(Name = "bottle-id")]int bottleId)
        {
            var bottle = db.GetBottle(bottleId);
            if (bottle != null)
            {
                return Ok(new BottleModel(bottle));
            }
            return BadRequest("bottle not found");
        }

        /// <summary>
        /// Подобрать бутылочку
        /// </summary>
        /// <param name="bottleId"></param>
        /// <returns></returns>
        [HttpPost("{bottle-id}/pick-up")]
        public IActionResult PickUp([FromRoute(Name = "bottle-id")] int bottleId)
        {
            var bottle = db.GetBottle(bottleId);
            var user = db.GetUser(User.Identity.Name);
            if (bottle == null || !bottle.Active || bottle.User == user)
                return BadRequest();
            bottle.Active = false;
            var dialog = new Dialog { Bottle = bottle, BottleOwnerId = bottle.UserId, Recipient = user };
            db.Dialogs.Add(dialog);
            db.SaveChanges();
            return Ok(new { dialogId = dialog.Id });
        }

        /// <summary>
        /// Создать бутылочку
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Create([FromBody]CreateBottleModel data)
        {
            var user = db.GetUser(User.Identity.Name);
            var bottle = new Models.Database.Bottle(data, user);
            db.Bottles.Add(bottle);
            db.SaveChanges();
            return Ok(new BottleModel(bottle));
        }

        /// <summary>
        /// Выбросить бутылочку
        /// </summary>
        /// <param name="bottleId"></param>
        /// <returns></returns>
        [HttpPost("{bottle-id}/throw")]
        public IActionResult Throw([FromRoute(Name = "bottle-id")] int bottleId)
        {
            var bottle = db.GetBottle(bottleId);
            var user = db.GetUser(User.Identity.Name);
            if (bottle == null || bottle.Active || bottle.UserId != user.Id)
                return BadRequest();
            bottle.Active = true;
            db.SaveChanges();
            return Ok(new BottleModel(bottle));
        }

        /// <summary>
        /// Удалить бутылочку
        /// </summary>
        /// <param name="bottleId"></param>
        /// <returns></returns>
        [HttpDelete("{bottle-id}")]
        public IActionResult Delete([FromRoute(Name = "bottle-id")] int bottleId)
        {
            var bottle = db.GetBottle(bottleId);
            var user = db.GetUser(User.Identity.Name);
            if (bottle != null && bottle.User == user)
            {
                db.Bottles.Remove(bottle);
                db.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        /// <summary>
        /// Получить массив бутылочек в соответствии с параметрами
        /// </summary>
        /// <param name="category">Категория бутылочки</param>
        /// <param name="radius">Радиус, в котором искать бутылочки</param>
        /// <param name="coordinates">Координаты</param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetBottles(string category = null, int? radius = null, string coordinates = null)
        {
            IEnumerable<Models.Database.Bottle> result = null;
            var bottles = db.Bottles.Where(b => b.Active);
            if (category != null)
                bottles = bottles.Where(b => b.Category == category);
            result = bottles;
            if (!(radius == null || string.IsNullOrEmpty(coordinates)))
            {
                result = bottles.ToList().Where(b => IsPointInCircle(b.Coordinates, coordinates, radius.Value));
            }
            return Ok(result.Select(b => new BottleModel(b)));
        }

        [HttpGet("my")]
        public IActionResult GetMyBottles()
        {
            var bottles = db.Bottles.Where(b => b.UserId.ToString() == User.Identity.Name);
            return Ok(bottles.Select(b => new BottleModel(b)));
        }

        private bool IsPointInCircle(string point, string center, int radius)
        {
            return true;
        }
    }
}
