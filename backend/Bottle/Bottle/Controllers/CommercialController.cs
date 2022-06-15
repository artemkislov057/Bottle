using Bottle.Models;
using Bottle.Models.DataBase;
using Bottle.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("api/commercial")]
    [Authorize]
    public class CommercialController : Controller
    {
        private readonly BottleDbContext db;
        private readonly UserManager<User> userManager;

        public CommercialController(BottleDbContext db, UserManager<User> userManager)
        {
            this.db = db;
            this.userManager = userManager;
        }


        [HttpPost("make")]
        public async Task<IActionResult> MakeAccountCommercialAsync([FromBody] CommercialModel model)
        {
            var user = await userManager.GetUserAsync(User);
            if (!ModelState.IsValid || user.IsCommercial)
            {
                return BadRequest();
            }
            user.CommercialData = new CommercialData(model);
            user.CommercialData.IsChecked = false;
            db.SaveChanges();
            return Ok(model);
        }

        [HttpPost("document")]
        [RequestSizeLimit(Settings.RequestSizeLimit)]
        public async Task<IActionResult> PostDocumentsAsync(IFormFile file)
        {
            var user = await userManager.GetUserAsync(User);
            var commercialData = db.CommercialData.FirstOrDefault(cd => cd.Id == user.Id);
            if (file == null || user.IsCommercial || commercialData == null)
            {
                return BadRequest();
            }
            byte[] fileData = null;
            using (var binaryReader = new BinaryReader(file.OpenReadStream()))
            {
                fileData = binaryReader.ReadBytes((int)file.Length);
            }
            commercialData.Documents = fileData;
            commercialData.DocumentsContentType = file.ContentType;
            commercialData.IsChecked = false;
            db.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetCommercialDataAsync()
        {
            var user = await userManager.GetUserAsync(User);
            var commercialData = db.CommercialData.FirstOrDefault(cd => cd.Id == user.Id);
            if (commercialData == null)
            {
                return NotFound();
            }
            return Ok(new CommercialModel(commercialData));
        }

        [HttpGet("document")]
        public async Task<IActionResult> GetDocumentAsync()
        {
            var user = await userManager.GetUserAsync(User);
            var commercialData = db.CommercialData.FirstOrDefault(cd => cd.Id == user.Id);
            if (commercialData?.Documents == null || commercialData.DocumentsContentType == null)
            {
                return NotFound();
            }
            return File(commercialData.Documents, commercialData.DocumentsContentType);
        }

        [HttpGet("admin-comments")]
        public async Task<IActionResult> GetAdminCommentsAsync()
        {
            var user = await userManager.GetUserAsync(User);
            var comments = db.CommercialDataAdminComments.Where(c => c.UserId == user.Id);
            return Ok(comments);
        }

        [HttpGet("is-checked")]
        public async Task<IActionResult> IsChecked()
        {
            var user = await userManager.GetUserAsync(User);
            var commercialData = db.CommercialData.FirstOrDefault(cd => cd.Id == user.Id);
            if (commercialData == null)
            {
                return NotFound();
            }
            return Ok(new { commercialData.IsChecked, commercialData.IsAccepted });
        }
    }
}
