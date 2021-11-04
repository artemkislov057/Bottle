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
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost("{dialog-id}")]
        public IActionResult SendMessage([FromRoute(Name = "dialog-id")] int dialogId, [FromBody] string value)
        {
            var dialog = db.GetDialog(dialogId);
            if (dialog == null || !dialog.Active)
                return BadRequest();
            var user = db.GetUser(User.Identity.Name);
            if (dialog.RecipientId == user.Id || dialog.BottleOwnerId == user.Id)
            {
                var message = new Message { DialogId = dialogId, SenderId = user.Id, Value = value, DateTime = DateTime.Now };
                db.Messages.Add(message);
                db.SaveChanges();
                return Ok(new MessageModel(message));
            }
            return BadRequest();
        }

        /// <summary>
        /// Получить сообщения из диалога
        /// </summary>
        /// <param name="dialogId"></param>
        /// <param name="messageId">ID последнего сообщения, с которого начать отсчет массива. Если не указывать, по умолчанию будет ID последнего сообщения в диалоге</param>
        /// <param name="length">Длина возвращаемого массива</param>
        /// <returns></returns>
        [HttpGet("{dialog-id}/messages")]
        public IActionResult GetMessages([FromRoute(Name = "dialog-id")]int dialogId, 
            [FromQuery(Name = "message-id")]int? messageId = null, int? length = null)
        {
            var user = db.GetUser(User.Identity.Name);
            var dialog = db.GetDialog(dialogId);
            if (dialog == null)
                return BadRequest();
            if (dialog.RecipientId == user.Id || dialog.BottleOwnerId == user.Id)
            {
                var messages = db.Messages.Where(m => m.DialogId == dialogId);
                return Ok(messages.Select(m => new MessageModel(m)));
            }
            return BadRequest();
        }

        [HttpPost("{dialog-id}/close")]
        public IActionResult Close([FromRoute(Name = "dialog-id")]int dialogId)
        {
            var dialog = db.GetDialog(dialogId);
            if (dialog is null || !dialog.Active)
                return BadRequest();
            var user = db.GetUser(User.Identity.Name);
            if (dialog.RecipientId == user.Id || dialog.BottleOwnerId == user.Id)
            {
                dialog.Active = false;
                db.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        /// <summary>
        /// Поставить оценку
        /// </summary>
        /// <param name="dialogId"></param>
        /// <param name="rate"></param>
        /// <returns></returns>
        [HttpPost("{dialog-id}/rating")]
        public IActionResult Rate([FromRoute(Name = "dialog-id")]int dialogId, [FromBody] int rate)
        {
            var dialog = db.GetDialog(dialogId);
            if (!dialog.Active && Models.Database.User.IsValidRating(rate))
            {
                var requestUser = db.GetUser(User.Identity.Name);
                if (requestUser.Id == dialog.RecipientId && dialog.BottleRate is null)
                {
                    db.SetUserRate(dialog.BottleOwnerId.ToString(), rate);
                    dialog.BottleRate = rate;
                }
                else if (requestUser.Id == dialog.BottleOwnerId && dialog.RecipientRate is null)
                {
                    db.SetUserRate(dialog.RecipientId.ToString(), rate);
                    dialog.RecipientRate = rate;
                }
                else
                {
                    return BadRequest();
                }
                if (!(dialog.RecipientRate is null || dialog.BottleRate is null))
                {
                    db.Dialogs.Remove(dialog);
                }
                db.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        /// <summary>
        /// Получить диалоги
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetDialogs()
        {
            var dialogs = db.Dialogs
                .Where(d => d.RecipientId.ToString() == User.Identity.Name && d.BottleRate == null || d.BottleOwnerId.ToString() == User.Identity.Name && d.RecipientRate == null);
            return Ok(dialogs.Select(d => new DialogModel(d)));
        }

        [HttpGet("{dialog-id}")]
        public IActionResult GetDialog([FromRoute(Name = "dialog-id")]int dialogId)
        {
            var dialog = db.GetDialog(dialogId);
            if (dialog == null)
                return BadRequest();
            if (dialog.BottleOwnerId.ToString() == User.Identity.Name || dialog.RecipientId.ToString() == User.Identity.Name)
            {
                return Ok(new DialogModel(dialog));
            }
            return BadRequest();
        }
    }
}
