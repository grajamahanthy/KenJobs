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
    public class AppliedJobsWorker : AppliedJobsContract
    {
        public AppliedJobBo GetAppliedJob(int id)
        {
            IGenericRepository<AppliedJob> repository = new GenericRepository<AppliedJob>();
            object objid = id;
            AppliedJob appliedJob = repository.GetById(objid);

            AppliedJobBo appliedJobBo = new AppliedJobBo();
            appliedJobBo.Id = appliedJob.Id;
            appliedJobBo.User_Id = appliedJob.User_Id;
            appliedJobBo.Client_Id = appliedJob.Client_Id;
            appliedJobBo.Job_Id = appliedJob.Job_Id;
            appliedJobBo.AppliedDate = appliedJob.AppliedDate;

            return appliedJobBo;
        }

        public IEnumerable<AppliedJobBo> GetAppliedJobs()
        {
            IGenericRepository<AppliedJob> repository = new GenericRepository<AppliedJob>();
            IEnumerable<AppliedJob> appliedJobsList = repository.GetAll();

            List<AppliedJobBo> appliedJobsBoList = new List<AppliedJobBo>();

            foreach (AppliedJob appliedJob in appliedJobsList)
            {
                AppliedJobBo appliedJobBo = new AppliedJobBo();
                appliedJobBo.Id = appliedJob.Id;
                appliedJobBo.User_Id = appliedJob.User_Id;
                appliedJobBo.Client_Id = appliedJob.Client_Id;
                appliedJobBo.Job_Id = appliedJob.Job_Id;
                appliedJobBo.AppliedDate = appliedJob.AppliedDate;
                appliedJobsBoList.Add(appliedJobBo);
            }
            return appliedJobsBoList;
        }

        public IEnumerable<JobBo> GetAppliedJobsByUserId(int userId)
        {
            ICustomRepository<Job> repository = new CustomRepository<Job>();
            IEnumerable<Job> jobList = repository.GetAppliedJobByUserId(userId);

            List<JobBo> jobBoList = new List<JobBo>();
            foreach (Job job in jobList)
            {
                JobBo jobBo = new JobBo();
                jobBo.Id = job.Id;
                jobBo.Client_Id = job.Client_Id;
                jobBo.JobTitle = job.JobTitle;
                jobBo.Description = job.Description;
                jobBo.NoOfVacancies = job.NoOfVacancies;
                jobBo.Qualification = job.Qualification;
                jobBo.State = job.State;
                jobBo.City = job.City;
                jobBo.Status = job.Status;
                jobBo.PostingStatus = job.PostingStatus;
                jobBo.JobType_Id = job.JobType_Id;
                jobBo.Category_id = job.Category_id;
                jobBo.MinSalary = job.MinSalary;
                jobBo.MaxSalary = job.MaxSalary;
                jobBo.MinExperience = job.MinExperience;
                jobBo.MaxExperience = job.MaxExperience;
                jobBo.Skills = job.Skills;
                jobBo.User_Id = job.User_Id;
                jobBo.Currency = job.Currency;
                jobBo.ClientName = job.ClientName;
                jobBo.Country = job.Country;

                JobType jobType = job.JobType;
                JobTypeBo jobTypeBo = new JobTypeBo();
                jobTypeBo.Id = jobType.Id;
                jobTypeBo.Name = jobType.Name;
                jobTypeBo.Status = jobType.Status;

                jobBo.JobType = jobTypeBo;

                JobCategory jobCategory = job.JobCategory;
                JobCategoryBo jobCategoryBo = new JobCategoryBo();

                jobCategoryBo.Id = jobCategory.Id;
                jobCategoryBo.Category = jobCategory.Category;
                jobCategoryBo.Status = jobCategory.Status;
                jobBo.JobCategory = jobCategoryBo;

                jobBoList.Add(jobBo);
            }
            return jobBoList;
        }

        public int PostAppliedJob(AppliedJobBo appliedJobBo)
        {
            IGenericRepository<AppliedJob> repository = new GenericRepository<AppliedJob>();
            try
            {
                AppliedJob appliedJob = new AppliedJob();
                appliedJob.Id = appliedJobBo.Id;
                appliedJob.User_Id = appliedJobBo.User_Id;
                appliedJob.Client_Id = appliedJobBo.Client_Id;
                appliedJob.Job_Id = appliedJobBo.Job_Id;
                appliedJob.AppliedDate = DateTime.UtcNow;
                appliedJob.CreatedBy = "admin";
                appliedJob.CreatedOn = DateTime.UtcNow;
                appliedJob.UpdatedBy = "admin";
                appliedJob.UpdatedOn = DateTime.UtcNow;
                repository.Insert(appliedJob);
                repository.Save();
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }

        }

        public int UpdateAppliedJob(int id, AppliedJobBo appliedJobBo)
        {
            IGenericRepository<AppliedJob> repository = new GenericRepository<AppliedJob>();
            AppliedJob appliedJob = new AppliedJob();
            appliedJob.Id = appliedJobBo.Id;
            appliedJob.User_Id = appliedJobBo.User_Id;
            appliedJob.Client_Id = appliedJobBo.Client_Id;
            appliedJob.Job_Id = appliedJobBo.Job_Id;
            appliedJob.AppliedDate = appliedJobBo.AppliedDate;

            repository.Update(appliedJob);
            repository.Save();
            return 1;
        }

        public IEnumerable<AppliedJobBo> GetAppliedJobs(int jobId, int userId)
        {
            ICustomRepository<AppliedJob> repository = new CustomRepository<AppliedJob>();

            IEnumerable<AppliedJob> appliedJobList = repository.GetAppliedJobs(jobId, userId);

            List<AppliedJobBo> appliedJobBoList = new List<AppliedJobBo>();

            foreach (AppliedJob appliedJob in appliedJobList)
            {
                AppliedJobBo appliedJobBo = new AppliedJobBo();
                appliedJobBo.Id = appliedJob.Id;
                appliedJobBo.Client_Id = appliedJob.Client_Id;
                appliedJobBo.Job_Id = appliedJob.Job_Id;
                appliedJobBo.AppliedDate = appliedJob.AppliedDate;

                appliedJobBoList.Add(appliedJobBo);
            }

            return appliedJobBoList;
        }



    }
}
