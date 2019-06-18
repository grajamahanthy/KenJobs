using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KenJobs.Bo.BusinessObjects;
using System.Threading.Tasks;

namespace KenJobs.Bl.Contracts
{
   public interface UserContract
    {
        IEnumerable<UserBo> GetUsers();
        UserBo GetUser(int id);
        int InsertUser(UserBo userBo);
        int UpdateUser(int id, UserBo userBo);
    }
}
