using Bottle.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Bottle.Utilities
{
    public class GoogleProviderUser : ExternalProviderUser
    {
        private string url = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=";

        public override async Task<bool> CheckAuthorizeAsync(string providerId, string accessToken)
        {
            HttpClient httpClient = new HttpClient();
            var request = await httpClient.GetAsync(url + accessToken);
            var result = await request.Content.ReadAsStringAsync();
            var resultModel = JsonConvert.DeserializeObject<AuthenticateResult>(result);
            return providerId == resultModel.user_id;
            //throw new NotImplementedException();
        }

        private class AuthenticateResult
        {
            public string user_id { get; set; }
        }
    }
}
