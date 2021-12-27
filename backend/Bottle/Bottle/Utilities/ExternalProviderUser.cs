using Bottle.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bottle.Utilities
{
    public abstract class ExternalProviderUser
    {
        public abstract Task<bool> CheckAuthorizeAsync(string providerId, string accessToken);

        public static ExternalProviderUser GetProvider(ExternalProvider externalProvider)
        {
            switch (externalProvider)
            {
                case ExternalProvider.Google:
                    return new GoogleProviderUser();
                case ExternalProvider.Facebook:
                    break;
                case ExternalProvider.VK:
                    break;
                case ExternalProvider.Instagram:
                    break;
            }
            throw new NotImplementedException();
        }
    }
}
