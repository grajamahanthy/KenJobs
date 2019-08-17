using KenJobs.Bl.Contracts;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal;
using KenJobs.Dal.Contracts;
using KenJobs.Dal.Workers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KenJobs.Bl.Workers
{
  public  class FavoriteJobsWorker : FavoriteJobsContarct
    {
        public FavoriteJobBo GetFavoriteJob(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<FavoriteJobBo> GetFavoriteJobs()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<FavoriteJobBo> GetFavoriteJobs(int jobId, int userId)
        {
            ICustomRepository<FavoriteJob> repository = new CustomRepository<FavoriteJob>();

            IEnumerable<FavoriteJob> favoriteJobList = repository.GetFavoriteJobs(jobId, userId);

            List<FavoriteJobBo> favoriteJobBoList = new List<FavoriteJobBo>();

            foreach (FavoriteJob favoriteJob in favoriteJobList)
            {
                FavoriteJobBo favoriteJobBo = new FavoriteJobBo();
                favoriteJobBo.Id = favoriteJob.Id;
                favoriteJobBo.Job_Id = favoriteJob.Job_Id;
                favoriteJobBo.AppliedDate = favoriteJob.AppliedDate;

                favoriteJobBoList.Add(favoriteJobBo);
            }

            return favoriteJobBoList;
        }

        public IEnumerable<JobBo> GetFavoriteJobsByUserId(int userId)
        {
            ICustomRepository<Job> repository = new CustomRepository<Job>();
            IEnumerable<Job> jobList = repository.GetFavoriteJobByUserId(userId);

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

        public int PostFavoriteJob(FavoriteJobBo favoriteJobBo)
        {
            IGenericRepository<FavoriteJob> repository = new GenericRepository<FavoriteJob>();
            try
            {
                FavoriteJob favoriteJob = new FavoriteJob();
                favoriteJob.Id = favoriteJobBo.Id;
                favoriteJob.User_Id = favoriteJobBo.User_Id;
                favoriteJob.Job_Id = favoriteJobBo.Job_Id;
                favoriteJob.AppliedDate = DateTime.UtcNow;
                favoriteJob.CreatedBy = "admin";
                favoriteJob.CreatedOn = DateTime.UtcNow;
                favoriteJob.UpdatedBy = "admin";
                favoriteJob.UpdatedOn = DateTime.UtcNow;
                repository.Insert(favoriteJob);
                repository.Save();
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }

        }

        public int UpdateFavoriteJob(int id, FavoriteJobBo appliedJobBo)
        {
            throw new NotImplementedException();
        }
    }
}
