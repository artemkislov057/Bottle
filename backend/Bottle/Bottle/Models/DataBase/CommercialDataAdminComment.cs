namespace Bottle.Models.DataBase
{
    public class CommercialDataAdminComment
    {
        public int Id { get; set; }
        public System.DateTime DateTime { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string Comments { get; set; }
    }
}
