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
   public class JobCategoryworker : JobCategoryContract
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
            IGenericRepository<JobCategory> repository=new GenericRepository<JobCategory>();
            object objid = id;
            JobCategory jobCategory = repository.GetById(objid);

            JobCategoryBo jobCategoryBo = new JobCategoryBo();
            jobCategoryBo.Id = jobCategory.Id;
            jobCategoryBo.Category = jobCategory.Category;
            jobCategoryBo.Status = jobCategory.Status;

            return jobCategoryBo;

        }

        public int PostJobCategory(JobCategoryBo jobCategoryBo)
        {
            IGenericRepository<JobCategory> repository=new GenericRepository<JobCategory>();

            JobCategory jobCategory = new JobCategory();
            jobCategory.Id = jobCategoryBo.Id;
            jobCategory.Category = jobCategoryBo.Category;
            jobCategory.Status = jobCategoryBo.Status;

            repository.Insert(jobCategory);
            repository.Save();
            return 1;

        }

        public int UpdateJobCategory(int id, JobCategoryBo jobCategoryBo)
        {
            IGenericRepository<JobCategory> repository=new GenericRepository<JobCategory>();

            JobCategory jobCategory = new JobCategory();
            jobCategory.Id = jobCategoryBo.Id;
            jobCategory.Category = jobCategoryBo.Category;
            jobCategory.Status = jobCategoryBo.Status;

            repository.Update(jobCategory);
            repository.Save();
            return 1;
        }
    }
}
