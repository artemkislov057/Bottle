using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;

namespace MyHttpServer
{
    class Program
    {
        static void Main(string[] args)
        {
            var address = File.ReadAllLines("address_settind.txt");
            var ip = address[0];
            var port = address[1];
            HttpListener listener = new HttpListener();
            listener.Prefixes.Add($"http://{ip}:{port}/");
            listener.Start();
            while (true)
            {
                var context = listener.GetContext();
                Thread thread = new Thread(() => GetQuery(context));
                thread.Start();
            }
        }

        public static void GetQuery(HttpListenerContext context)
        {
            var request = context.Request;
            Console.WriteLine($"Http Method: {request.HttpMethod}");
            Console.WriteLine($"Полный Url: {request.Url}");
            Console.WriteLine($"Url запроса: {request.RawUrl}");
            if (request.QueryString.Count > 0)
            {
                Console.WriteLine($"Url запроса без параметров: {request.Url.LocalPath}");
                Console.WriteLine("Параметры запроса:");
                foreach (var key in request.QueryString)
                {
                    Console.WriteLine($"\t{key}: {string.Join(", ", request.QueryString.GetValues(key.ToString()))}");
                }
            }
            else
            {
                Console.WriteLine("Параметры запроса отсутствуют");
            }
            Console.WriteLine($"Ip Address запроса: {request.RemoteEndPoint.Address}");
            Console.WriteLine($"Порт запроса: {request.RemoteEndPoint.Port}");
            if (request.HasEntityBody)
            {
                var inputStream = request.InputStream;
                var inputBytes = new byte[request.ContentLength64];
                inputStream.Read(inputBytes);
                var requestString = Encoding.UTF8.GetString(inputBytes);
                Console.WriteLine("Тело запроса:");
                Console.WriteLine(requestString);
            }
            else
            {
                Console.WriteLine("Пустое тело запроса");
            }

            var response = context.Response;
            var responseString = "Hello world!";
            response.ContentLength64 = responseString.Length;
            var outputStream = response.OutputStream;
            var outputBytes = Encoding.UTF8.GetBytes(responseString);
            outputStream.Write(outputBytes, 0, responseString.Length);

            Console.WriteLine();
        }
    }
}
