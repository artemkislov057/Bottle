using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Models
{
    public class ExternalLoginModel
    {
        public ExternalProvider Provider { get; set; }
        public string ProviderId { get; set; }
        public string AccessToken { get; set; }
        public bool RememberMe { get; set; }
    }

    public enum ExternalProvider
    {
        Google,
        Facebook,
        VK,
        Instagram
    }
}
