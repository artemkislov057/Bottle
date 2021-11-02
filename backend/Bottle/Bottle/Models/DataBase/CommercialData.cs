using System.ComponentModel.DataAnnotations.Schema;

namespace Bottle.Models.Database
{
    public class CommercialData
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Company { get; set; }
        public string IdentificationNumber { get; set; }
        public string PSRN { get; set; }

        [ForeignKey("Id")]
        public User User { get; set; }
    }
}