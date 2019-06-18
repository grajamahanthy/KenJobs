using KenJobs.Bl.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal.Contracts;
using KenJobs.Dal;
using KenJobs.Dal.Workers;

namespace KenJobs.Bl.Workers
{
    class JobCategoryworker : JobCategoryContract
    {
        public IEnumerable<JobCategoryBo> GetJobCategories()
        {
            IGenericRepository<JobCategory> repository = new GenericRepository<JobCategory>();
            IEnumerable<JobCategory> jobTypeList = repository.GetAll();
            List<JobCategoryBo> jobCategoryBoList = new List<JobCategoryBo>();

            foreach (JobCategory jobCategory in jobTypeList)
            {
                JobCategoryBo jobCategoryeBo = new JobCategoryBo();
                jobCategoryeBo.Id = jobCategory.Id;
                jobCategoryeBo.Category = jobCategory.Category;
                jobCategoryeBo.Status = jobCategory.Status;
                jobCategoryBoList.Add(jobCategoryeBo);
            }
            return jobCategoryBoList;
        }

        public JobCategoryBo GetJobCategory(int id)
        {
            throw new NotImplementedException();
        }

        public int PostJobCategory(JobCategoryBo jobCategoryBo)
        {
            throw new NotImplementedException();
        }

        public int UpdateJobCategory(int id, JobCategoryBo jobCategoryBo)
        {
            throw new NotImplementedException();
        }
    }
}
