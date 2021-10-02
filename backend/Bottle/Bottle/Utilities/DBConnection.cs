using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Utilities
{
    public static class DBConnection
    {
        public static MyDbContext db { get; set; }

        static DBConnection()
        {
            db = new MyDbContext();
        }


    }
}
