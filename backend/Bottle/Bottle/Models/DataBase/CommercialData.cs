using Bottle.Models.DataBase;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bottle.Models.DataBase
{
    public class CommercialData
    {

        public CommercialData()
        {

        }

        public CommercialData(CommercialModel model)
        {
            FullName = model.FullName;
            Company = model.Company;
            IdentificationNumber = model.IdentificationNumber;
            PSRN = model.PSRN;
        }

        public string Id { get; set; }
        public string FullName { get; set; }
        public string Company { get; set; }
        public string IdentificationNumber { get; set; }
        public string PSRN { get; set; }

        [ForeignKey("Id")]
        public User User { get; set; }
    }
}