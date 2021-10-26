using Bottle.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("/[controller]")]
    public class BottlesController : Controller
    {
        [HttpGet("{bottleId}")]
        public IActionResult GetInformation(int bottleId)
        {
            return Ok($"Вот тебе JSON с информацией о бутылке с ID {bottleId}");
        }

        [HttpPost("{bottleId}/pick-up")]
        public IActionResult PickUp(int bottleId)
        {
            return Ok($"Вы подобрали бутылочку с ID {bottleId}. Создан диалог с ID 228");
        }

        [HttpPost]
        public IActionResult Create([FromBody]BottleDescription data)
        {
            return Json(data);
        }

        [HttpPost("{bottleId}/throw")]
        public IActionResult Throw(int bottleId)
        {
            return Ok($"Вы выбросили бутылку с ID {bottleId} обратно.");
        }

        [HttpDelete("{bottleId}")]
        public IActionResult Delete(int bottleId)
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
