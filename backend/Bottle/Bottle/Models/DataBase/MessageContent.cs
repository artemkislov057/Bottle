using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Models.DataBase
{
    public class MessageContent
    {
        public int Id { get; set; }
        public byte[] BinaryData { get; set; }
    }
}
