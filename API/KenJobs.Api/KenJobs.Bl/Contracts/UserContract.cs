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
        IEnumerable<UserBo> GetUser();
        int InsertUser(UserBo userBo);
    }
}
