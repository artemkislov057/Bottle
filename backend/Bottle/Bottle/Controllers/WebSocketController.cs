using Bottle.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace Bottle.Controllers
{
    public class WebSocketController : ControllerBase
    {

        // Список всех клиентов
        private static readonly HashSet<WebSocketUser> Clients = new();

        // Блокировка для обеспечения потокабезопасности
        private static readonly ReaderWriterLockSlim Locker = new ReaderWriterLockSlim();

        [HttpGet("/ws")]
        public async Task Index()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                var client = new WebSocketUser(webSocket);
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
                var task = client.Listen();
                while (!task.IsCompleted)
                {
                    await Task.Delay(100).ConfigureAwait(false);
                }
                Clients.Remove(client);
            }
            else
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            }
        }
    }
}
