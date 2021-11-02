using System.ComponentModel.DataAnnotations.Schema;

namespace Bottle.Models.Database
{
    public class BottleContent
    {
        public int Id { get; set; }
        public string Attachment { get; set; }

        public Bottle Bottle;

        public ContentType Type { get; set; }
    }
}