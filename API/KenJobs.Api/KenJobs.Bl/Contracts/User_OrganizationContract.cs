using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Contracts
{
   public interface User_OrganizationContract
    {
        IEnumerable<User_OrganizationBo> GetUser_Organizations();
        User_OrganizationBo GetUser_Organization(int id);
        int PostGetUser_Organizations(User_OrganizationBo user_OrganizationBo);
        int UpdateGetUser_Organizations(int id,User_OrganizationBo user_OrganizationBo);
    }
}
