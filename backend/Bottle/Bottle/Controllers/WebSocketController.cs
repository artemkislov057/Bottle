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
    public class WebSocketController : Controller
    {

        // Список всех клиентов
        private static readonly HashSet<WebSocketUser> Clients = new();

        // Блокировка для обеспечения потокабезопасности
        private static readonly ReaderWriterLockSlim Locker = new ReaderWriterLockSlim();

        [HttpGet("ws")]
        [Authorize]
        public async Task Index()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                var client = new WebSocketUser(webSocket, User.Identity.Name);
                client.SendMessage += async (message) =>
                {
                    if (message == "disconnect")
                    {
                        await client.Close(WebSocketCloseStatus.NormalClosure, null, CancellationToken.None);
                        Clients.Remove(client);
                        return;
                    }
                    foreach (var e in Clients)
                    {
                        await e.Echo(message);
                    }
                };
                client.ClientClosedConnection += async (message) =>
                {
                    foreach (var e in Clients)
                    {
                        await e.Echo("Пользователь отключился");
                    }
                    Clients.Remove(client);
                };
                Clients.Add(client);
                await client.Listen();
                Clients.Remove(client);
            }
            else
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            }
        }

        public async static Task SendMessage(string id, object model)
        {
            var result = JsonConvert.SerializeObject(model);
            await SendMessage(id, result);
        }

        public async static Task SendMessage(string id, string message)
        {
            var webSocketClients = Clients.Where(client => client.id == id);
            foreach (var e in webSocketClients)
            {
                await e.Echo(message);
            }
        }
    }
}
