using Bottle.Models;
using Bottle.Models.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Authorize]
    [Route("api/dialogs")]
    public class DialogsController : Controller
    {
        /// <summary>
        /// Отправить сообщение
        /// </summary>
        /// <param name="dialogId"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost("{dialog-id}")]
        public IActionResult SendMessage([FromRoute(Name = "dialog-id")]int dialogId, [FromBody]Message data)
        {
            return Ok($"Сообщение отправлено в {dialogId} диалог.");
        }

        /// <summary>
        /// Получить сообщения из диалога
        /// </summary>
        /// <param name="dialogId"></param>
        /// <param name="messageId">ID последнего сообщения, с которого начать отсчет массива. Если не указывать, по умолчанию будет ID последнего сообщения в диалоге</param>
        /// <param name="length">Длина возвращаемого массива</param>
        /// <returns></returns>
        [HttpGet("{dialog-id}")]
        public IActionResult GetMessages([FromRoute(Name = "dialog-id")]int dialogId, [FromQuery(Name = "message-id")]int? messageId = null, int? length = null)
        {
            return Ok($"JSON с сообщениями из диалога с {dialogId} ID");
        }

        [HttpPost("close")]
        public IActionResult Close()
        {
            return Ok("Dialog is closed");
        }

        /// <summary>
        /// Поставить оценку
        /// </summary>
        /// <param name="dialogId"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost("{dialog-id}/rating")]
        public IActionResult Rate([FromRoute(Name = "dialog-id")]int dialogId, [FromBody]Dialog data)
        {
            return Ok("Поставили оценку.");
        }

        /// <summary>
        /// Получить диалоги
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetDialogs()
        {
            return Ok("Вот тебе все диалоги.");
        }
    }
}
