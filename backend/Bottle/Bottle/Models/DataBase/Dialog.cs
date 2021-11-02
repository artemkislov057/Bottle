﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bottle.Models.Database
{
    public class Dialog
    {
        public int Id { get; set; }

        public Bottle Bottle { get; set; }

        public User Recipient { get; set; }

        public List<Message> Messages { get; set; }
    }
}