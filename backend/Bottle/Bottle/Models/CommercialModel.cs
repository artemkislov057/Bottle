using Bottle.Models.DataBase;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Models
{
    public class CommercialModel
    {
        public CommercialModel()
        {

        }

        public CommercialModel(CommercialData data)
        {
            FullName = data.FullName;
            Company = data.Company;
            IdentificationNumber = data.IdentificationNumber;
            PSRN = data.PSRN;
        }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string Company { get; set; }

        [Required]
        public string IdentificationNumber { get; set; }

        [Required]
        public string PSRN { get; set; }
    }
}
