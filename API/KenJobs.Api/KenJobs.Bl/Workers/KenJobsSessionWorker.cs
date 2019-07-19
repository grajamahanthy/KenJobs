using KenJobs.Bl.Contracts;
using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Workers
{
    public class KenJobsSessionWorker: KenJobsSessionContractor
    {
        public KenJobsSession Get(string AspnetUserId)
        {
            KenJobsSession s = new KenJobsSession();
            UserContract uw = new UserWorker();
            AspNetUserBo au = uw.GetAspNetUser(AspnetUserId);
            UserBo u = uw.GetUserByEmail(au.Email);
            AspNetRoleBo r = au.AspNetRoles.ToList()[0];

            s.User = u;
            s.UserRole = r.Id;
            s.IdentityData = au;
            return s;
        }
    }
}
