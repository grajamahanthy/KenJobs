using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Contracts
{
   public interface JobTypeContract
    {
        IEnumerable<JobTypeBo> GetJobTypes();
        JobTypeBo GetJobType(int id);
        int PostJobType(JobTypeBo jobtypeBo);
        int UpdateJobtype(int id, JobTypeBo jobtypeBo);
    }
}
