using Bottle.Models.DataBase;

namespace Bottle.Models
{
    public class MessageModel
    {
        public int Id { get; set; }
        public string MessageType { get; set; }
        public string Value { get; set; }
        public System.DateTime DateTime { get; set; }
        public int DialogId { get; set; }
        public string SenderId { get; set; }

        public MessageModel()
        {

        }

        public MessageModel(Message message)
        {
            Id = message.Id;
            MessageType = message.MessageType;
            Value = message.Value;
            DateTime = message.DateTime;
            DialogId = message.DialogId;
            SenderId = message.SenderId;
        }
    }
}
