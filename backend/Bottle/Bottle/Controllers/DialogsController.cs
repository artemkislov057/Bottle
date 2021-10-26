using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("api/dialogs")]
    public class DialogsController : Controller
    {
        [HttpPost("{dialog-id}")]
        public IActionResult SendMessage([FromRoute(Name = "dialog-id")]int dialogId)
        {
            return Ok($"Сообщение отправлено в {dialogId} диалог.");
        }

        [HttpGet("{dialog-id}")]
        public IActionResult GetMessages([FromRoute(Name = "dialog-id")]int dialogId)
        {
            return Ok($"JSON с сообщениями из диалога с {dialogId} ID");
        }

        [HttpPost("{dialog-id}/rating")]
        public IActionResult Rate([FromRoute(Name = "dialog-id")]int dialogId)
        {
            return Ok("Поставили оценку.");
        }

        [HttpGet]
        public IActionResult GetDialogs()
        {
            return Ok("Вот тебе все диалоги.");
        }
    }
}
