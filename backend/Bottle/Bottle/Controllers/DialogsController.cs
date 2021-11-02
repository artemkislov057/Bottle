using Bottle.Models;
using Bottle.Models.Database;
using Bottle.Utilities;
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
        private BottleDbContext db;
        public DialogsController(BottleDbContext db)
        {
            this.db = db;
        }

        /// <summary>
        /// Отправить сообщение
        /// </summary>
        /// <param name="dialogId"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost("{dialog-id}")]
        public IActionResult SendMessage([FromRoute(Name = "dialog-id")] int dialogId, [FromBody] string value)
        {
            var dialog = db.GetDialog(dialogId);
            var message = new Message { DialogId = dialogId, SenderId = db.GetUser(User.Identity.Name).Id, Value = value, DateTime = DateTime.Now };
            db.Messages.Add(message);
            db.SaveChanges();
            return Ok(new MessageModel(message));
        }

        /// <summary>
        /// Получить сообщения из диалога
        /// </summary>
        /// <param name="dialogId"></param>
        /// <param name="messageId">ID последнего сообщения, с которого начать отсчет массива. Если не указывать, по умолчанию будет ID последнего сообщения в диалоге</param>
        /// <param name="length">Длина возвращаемого массива</param>
        /// <returns></returns>
        [HttpGet("{dialog-id}")]
        public IActionResult GetMessages([FromRoute(Name = "dialog-id")]int dialogId, 
            [FromQuery(Name = "message-id")]int? messageId = null, int? length = null)
        {
            if (!db.Dialogs.Any(d => d.Id == dialogId))
            {
                return BadRequest("Пошел нахуй");
            }
            var dialogMessages = db.Messages.Where(d => d.DialogId == dialogId);

            return Ok(dialogMessages);
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
        public IActionResult Rate([FromRoute(Name = "dialog-id")]int dialogId, [FromBody] int rate)
        {
            var user = db.GetUserByDialog(dialogId);
            user.RatingSum += rate;
            user.RatingCount += 1;
            db.SaveChanges();
            return Ok("Поставили оценку.");
        }

        /// <summary>
        /// Получить диалоги
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetDialogs()
        {
            return Ok(db.Dialogs.Where(d => d.RecipientId.ToString() == User.Identity.Name));
        }
    }
}
