using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;

namespace KenJobs.Bl.Contracts
{
    interface AppliedJobsContract
    {
        IEnumerable<AppliedJobBo> GetAppliedJobs();
        AppliedJobBo GetAppliedJob(int id);
        int PostAppliedJob(AppliedJobBo appliedJobBo);
        int UpdateAppliedJob(int id, AppliedJobBo appliedJobBo);
    }
}
