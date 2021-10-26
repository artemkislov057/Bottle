using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("/[controller]")]
    public class DialogsController : Controller
    {
        [HttpPost("{dialogId}")]
        public IActionResult SendMessage(int dialogId)
        {
            return Ok($"Сообщение отправлено в {dialogId} диалог.");
        }

        [HttpGet("{dialogId}")]
        public IActionResult GetMessages(int dialogId)
        {
            return Ok($"JSON с сообщениями из диалога с {dialogId} ID");
        }

        [HttpPost("{dialogId}/rating")]
        public IActionResult Rate(int dialogId)
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
