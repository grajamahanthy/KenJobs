using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;

namespace KenJobs.Bl.Contracts
{
    interface UserClientContract
    {
        IEnumerable<User_Organization_ClientBo> GetUserClients();
        User_Organization_ClientBo GetUserClient(int id);
        int PostUserClient(User_Organization_ClientBo userClientBo);
        int UpdateUserClient(int id, User_Organization_ClientBo userClientBo);
    }
}
