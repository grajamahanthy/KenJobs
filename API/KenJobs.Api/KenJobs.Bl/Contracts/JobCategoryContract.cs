using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Contracts
{
    public interface JobCategoryContract
    {
        IEnumerable<JobCategoryBo> GetJobCategories();
        JobCategoryBo GetJobCategory(int id);
        int PostJobCategory(JobCategoryBo jobCategoryBo);
        int UpdateJobCategory(int id, JobCategoryBo jobCategoryBo);
    }
}
