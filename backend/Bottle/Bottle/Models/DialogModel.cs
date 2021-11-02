using Bottle.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Models
{
    public class DialogModel
    {
        public DialogModel()
        {

        }

        public DialogModel(Dialog dialog)
        {
            Id = dialog.Id;
            BottleId = dialog.BottleId;
            RecipientId = dialog.RecipientId;
        }

        public int Id { get; set; }
        public int BottleId { get; set; }
        public int RecipientId { get; set; }
    }
}
