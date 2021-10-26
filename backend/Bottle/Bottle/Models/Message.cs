using System;

namespace BottleProject.Utilities
{
    public class Message
    {
        public int Id { get; set; }
        public int DialogId { get; set; }
        public int Sender { get; set; }
        public string Value { get; set; }
        public DateTime DateTime { get; set; }
    }
}
