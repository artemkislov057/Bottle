using Bottle.Models;
using Bottle.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    [Route("ws")]
    public class WebSocketController : Controller
    {

        // Список всех клиентов
        private static readonly Dictionary<string, HashSet<WebSocketUser>> Clients = new();

        // Блокировка для обеспечения потокабезопасности
        private static readonly ReaderWriterLockSlim Locker = new ReaderWriterLockSlim();

        [HttpGet]
        [Authorize]
        public async Task Index()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                var client = new WebSocketUser(webSocket, User.Identity.Name);
                client.SendMessage += (message) =>
                {
                    var coordinates = JsonConvert.DeserializeObject<CoordinatesModel>(message);
                    client.Coordinates = coordinates;
                };
                client.ClientClosedConnection += async (message) =>
                {
                    foreach (var c in Clients)
                    {
                        foreach (var ws in c.Value)
                        {
                            await ws.Echo("Пользователь отключился");
                        }
                    }
                    Clients[client.id].Remove(client);
                };
                if (Clients.TryGetValue(User.Identity.Name, out var webSockets))
                {
                    webSockets.Add(client);
                }
                else
                {
                    Clients[User.Identity.Name] = new() { client };
                }
                await client.Listen();
                Clients[client.id].Remove(client);
            }
            else
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            }
        }

        [HttpGet("event-types")]
        public IActionResult GetWebSocketEventTypes()
        {
            return Ok(Enum.GetValues<WebSocketRequestModel.EventType>().ToDictionary(v => v));
        }

        public static async Task SendMessage(string id, object model)
        {
            var result = JsonConvert.SerializeObject(model);
            await SendMessage(id, result);
        }

        public static async Task SendMessage(string id, string message)
        {
            if (Clients.TryGetValue(id, out var webSocketClients))
            {
                foreach (var e in webSocketClients)
                {
                    await e.Echo(message);
                }
            }
        }

        public static async Task OnCreatingDialog(string id, DialogModel dialog)
        {
            if (Clients.TryGetValue(id, out var webSocketClients))
            {
                foreach (var e in webSocketClients)
                {
                    await e.Echo(new WebSocketRequestModel { EventNumber = WebSocketRequestModel.EventType.CreateDialog, Model = dialog });
                }
            }
        }

        public static async Task OnCreatingBottle(Models.Database.Bottle model)
        {
            var recipientWebSockets = await GetRecipientWebSockets(model);
            foreach (var ws in recipientWebSockets)
            {
                await ws.Echo(new WebSocketRequestModel { EventNumber = WebSocketRequestModel.EventType.CreateBottle, Model = new BottleModel(model) });
            }
        }

        public static async Task OnPickedUdBottle(Models.Database.Bottle model)
        {
            var recipientWebSockets = await GetRecipientWebSockets(model);
            foreach (var ws in recipientWebSockets)
            {
                await ws.Echo(new WebSocketRequestModel { EventNumber = WebSocketRequestModel.EventType.BottlePickedUp, Model = new BottleModel(model) });
            }
        }

        private static async Task<IEnumerable<WebSocketUser>> GetRecipientWebSockets(Models.Database.Bottle model)
        {
            var allWebSockets = Clients.SelectMany(c => c.Value);
            return await Task.Run(() =>
            {
                return allWebSockets.Where(ws =>
                {
                    return BottlesController.IsPointInCircle(ws.Coordinates.Lat, ws.Coordinates.Lng, model.Lat, model.Lng, ws.Coordinates.Radius);
                });
            });
        }
    }
}
