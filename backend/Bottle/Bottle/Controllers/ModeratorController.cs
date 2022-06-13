using Bottle.Models;
using Bottle.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("api/moderator")]
    [Authorize(Roles = "Admin,Moderator")]
    public class ModeratorController : Controller
    {
        private readonly BottleDbContext db;

        public ModeratorController(BottleDbContext db)
        {
            this.db = db;
        }

        [HttpGet("requests/unchecked")]
        public IActionResult GetUncheckedRequest()
        {
            var requests = db.CommercialData.Where(cd => !cd.IsChecked)
                                            .Select(cd => new { cd.Id, data = new CommercialModel(cd) });
            return Ok(requests);
        }

        [HttpGet("requests/{id}/document")]
        public IActionResult GetDocument([FromRoute] string id)
        {
            var request = db.CommercialData.FirstOrDefault(cd => cd.Id == id);
            if (request.Documents == null || request.DocumentsContentType == null)
            {
                return NotFound();
            }
            return File(request.Documents, request.DocumentsContentType);
        }

        [HttpPost("requests/{id}/reject")]
        public IActionResult RejectRequest([FromRoute] string id, [FromBody] AdminCommentModel comment)
        {
            var commercialData = db.CommercialData.FirstOrDefault(cd => cd.Id == id);
            if (commercialData == null || commercialData.IsChecked)
            {
                return BadRequest();
            }
            commercialData.IsChecked = true;
            commercialData.IsAccepted = false;
            db.CommercialDataAdminComments.Add(new Models.DataBase.CommercialDataAdminComment { DateTime = DateTime.UtcNow, Comments = comment.Value, UserId = id });
            db.SaveChanges();
            return Ok();
        }

        [HttpPost("requests/{id}/accept")]
        public IActionResult AcceptRequest([FromRoute] string id)
        {
            var commercialData = db.CommercialData.FirstOrDefault(cd => cd.Id == id);
            if (commercialData == null || commercialData.IsChecked)
            {
                return BadRequest();
            }
            commercialData.IsChecked = true;
            commercialData.IsAccepted = true;
            var user = db.Users.FirstOrDefault(u => u.Id == id);
            user.IsCommercial = true;
            user.MaxBottlesCount = 0;
            db.SaveChanges();
            return Ok();
        }

        [HttpGet("requests/rejected")]
        public IActionResult GetRejectedRequests()
        {
            var requests = db.CommercialData.Where(cd => cd.IsChecked && !cd.IsAccepted);
            return Ok(requests.Select(r => new { r.Id, data = new CommercialModel(r) }));
        }

        [HttpGet("requests/accepted")]
        public IActionResult GetAcceptedRequests()
        {
            var requests = db.CommercialData.Where(cd => cd.IsAccepted);
            return Ok(requests.Select(r => new { r.Id, data = new CommercialModel(r) }));
        }


        /// <summary>
        /// Временный метод пока нет оплаты
        /// </summary>
        /// <returns></returns>
        [HttpPost("user/{id}/max-bottles-count")]
        public IActionResult ChangeMaxBottlesCount([FromBody] MaxBottlesCountModel model, [FromRoute] string id)
        {
            var user = db.Users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound();
            user.MaxBottlesCount = model.Value;
            db.SaveChanges();
            return Ok();
        }

        public class MaxBottlesCountModel
        {
            public int Value { get; set; }
        }
    }
}
