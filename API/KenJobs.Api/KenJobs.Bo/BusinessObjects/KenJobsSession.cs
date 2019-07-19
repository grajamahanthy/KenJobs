using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bo.BusinessObjects
{
    public class KenJobsSession
    {
        public AspNetUserBo IdentityData { set; get; }
        public UserBo User { set; get; }
        public string UserRole { set; get; }
        public int OrgId { set; get; }
    }
}
