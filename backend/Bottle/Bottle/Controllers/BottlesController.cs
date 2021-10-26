using Bottle.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("api/bottle")]
    public class BottlesController : Controller
    {
        [HttpGet("{bottle-id}")]
        public IActionResult GetInformation([FromRoute(Name = "bottle-id")]int bottleId)
        {
            return Ok($"Вот тебе JSON с информацией о бутылке с ID {bottleId}");
        }

        [HttpPost("{bottle-id}/pick-up")]
        public IActionResult PickUp([FromRoute(Name = "bottle-id")] int bottleId)
        {
            return Ok($"Вы подобрали бутылочку с ID {bottleId}. Создан диалог с ID 228");
        }

        [HttpPost]
        public IActionResult Create()
        {
            return Ok("Бутылочка создана");
        }

        [HttpPost("{bottle-id}/throw")]
        public IActionResult Throw([FromRoute(Name = "bottle-id")] int bottleId)
        {
            return Ok($"Вы выбросили бутылку с ID {bottleId} обратно.");
        }

        [HttpDelete("{bottle-id}")]
        public IActionResult Delete([FromRoute(Name = "bottle-id")] int bottleId)
        {
            return Ok($"Вы удалили бутылку с ID {bottleId}");
        }

        [HttpGet]
        public IActionResult GetBottles()
        {
            return Ok("JSON с информацией о бутылках.");
        }
    }
}
