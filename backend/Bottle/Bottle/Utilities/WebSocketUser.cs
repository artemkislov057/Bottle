using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Bottle.Utilities
{
    public class WebSocketUser
    {
        public WebSocketUser(WebSocket webSocket)
        {
            this.webSocket = webSocket;
            cancelTokenSource = new();
            token = cancelTokenSource.Token;
        }

        public readonly int BufferSize = 1024 * 4;

        public event Action<string> SendMessage;
        public event Action<WebSocketCloseStatus> ClientClosedConnection;

        public async Task Echo(string message)
        {
            var result = new ArraySegment<byte>(Encoding.UTF8.GetBytes(message));
            await webSocket.SendAsync(result, WebSocketMessageType.Text, true, CancellationToken.None);
        }

        public async Task Listen()
        {
            while (true)
            {
                var task = ListenMessage();
                while (!task.IsCompleted)
                {
                    await Task.Delay(100).ConfigureAwait(false);
                }
                if (cancelTokenSource.IsCancellationRequested)
                {
                    return;
                }
            }
        }

        public async Task Close(WebSocketCloseStatus closeStatus, string statusDescription, CancellationToken cancellationToken)
        {
            await webSocket.CloseAsync(closeStatus, statusDescription, cancellationToken);
            cancelTokenSource.Cancel();
        }

        private readonly WebSocket webSocket;
        private CancellationTokenSource cancelTokenSource;
        private CancellationToken token;

        private async Task ListenMessage()
        {
            var buffer = new byte[BufferSize];
            var result = Enumerable.Empty<byte>();
            var receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), token);
            result = result.Concat(buffer.Take(receiveResult.Count));
            while (!(receiveResult.EndOfMessage || receiveResult.CloseStatus.HasValue))
            {
                receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), token);
                result = result.Concat(buffer.Take(receiveResult.Count));
            }
            if (receiveResult.CloseStatus.HasValue)
            {
                ClientClosedConnection?.Invoke(receiveResult.CloseStatus.Value);
                await Close(WebSocketCloseStatus.NormalClosure, null, CancellationToken.None);
                return;
            }
            SendMessage?.Invoke(Encoding.UTF8.GetString(result.ToArray()));
        }
    }
}
