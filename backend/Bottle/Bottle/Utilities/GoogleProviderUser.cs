﻿using Bottle.Models;
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

        public override async Task<ExternalUserModel> CheckAuthorizeAsync(string userId, string accessToken)
        {
            HttpClient httpClient = new HttpClient();
            var request = await httpClient.GetAsync(url + accessToken);
            var requestContent = await request.Content.ReadAsStringAsync();
            var contentModel = JsonConvert.DeserializeObject<AuthenticateResult>(requestContent);
            return new ExternalUserModel
            {
                Email = contentModel.email,
                IsAuthorize = userId == contentModel.user_id
            };
            //throw new NotImplementedException();
        }

        private class AuthenticateResult
        {
            public string user_id { get; set; }
            public string email { get; set; }
        }
    }
}
