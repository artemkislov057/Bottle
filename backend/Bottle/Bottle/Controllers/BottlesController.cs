using Bottle.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Authorize]
    [Route("api/bottles")]
    public class BottlesController : Controller
    {
        /// <summary>
        /// Получить информацию о бутылочке
        /// </summary>
        /// <param name="bottleId"></param>
        /// <param name="fields">Поля, которые надо получить. Если ничего не присваивать, в результате будут все поля.</param>
        /// <returns></returns>
        [HttpGet("{bottle-id}")]
        public IActionResult GetInformation([FromRoute(Name = "bottle-id")]int bottleId, string[] fields = null)
        {
            return Ok($"Вот тебе JSON с информацией о бутылке с ID {bottleId}");
        }

        /// <summary>
        /// Подобрать бутылочку
        /// </summary>
        /// <param name="bottleId"></param>
        /// <returns></returns>
        [HttpPost("{bottle-id}/pick-up")]
        public IActionResult PickUp([FromRoute(Name = "bottle-id")] int bottleId)
        {
            return Ok($"Вы подобрали бутылочку с ID {bottleId}. Создан диалог с ID 228");
        }

        /// <summary>
        /// Создать бутылочку
        /// </summary>
        /// <param name="bottle"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Create([FromBody]Models.Bottle bottle)
        {
            return Ok("Бутылочка создана");
        }

        /// <summary>
        /// Выбросить бутылочку
        /// </summary>
        /// <param name="bottleId"></param>
        /// <returns></returns>
        [HttpPost("{bottle-id}/throw")]
        public IActionResult Throw([FromRoute(Name = "bottle-id")] int bottleId)
        {
            return Ok($"Вы выбросили бутылку с ID {bottleId} обратно.");
        }

        /// <summary>
        /// Удалить бутылочку
        /// </summary>
        /// <param name="bottleId"></param>
        /// <returns></returns>
        [HttpDelete("{bottle-id}")]
        public IActionResult Delete([FromRoute(Name = "bottle-id")] int bottleId)
        {
            return Ok($"Вы удалили бутылку с ID {bottleId}");
        }

        /// <summary>
        /// Получить массив бутылочек в соответствии с параметрами
        /// </summary>
        /// <param name="category">Категория бутылочки</param>
        /// <param name="radius">Радиус, в котором искать бутылочки</param>
        /// <param name="latitude">Широта местоположения</param>
        /// <param name="longitude">Долгота местоположения</param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetBottles(string category = null, int? radius = null, int? latitude = null, int? longitude = null)
        {
            return Ok("JSON с информацией о бутылках.");
        }
    }
}
