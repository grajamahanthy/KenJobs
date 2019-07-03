using KenJobs.Bl.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Dal.Contracts;
using KenJobs.Dal.Workers;
using KenJobs.Dal;

namespace KenJobs.Bl.Workers
{
    public class JobsWorker : JobsContract
    {
        public IEnumerable<JobBo> GetJobs()
        {
            IGenericRepository<Job> repository = new GenericRepository<Job>();
            IEnumerable<Job> jobList = repository.GetAll();

            List<JobBo> jobBolist = new List<JobBo>();
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
                jobBolist.Add(jobBo);
            }
            return jobBolist;
        }

        public JobBo GetJob(int jobid)
        {
            IGenericRepository<Job> repository = new GenericRepository<Job>();
            object objid = jobid;
            Job job = repository.GetById(objid);

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



            return jobBo;

        }

        public void PostJob(JobBo jobBo)
        {
            IGenericRepository<Job> repository = new GenericRepository<Job>();

            Job job = new Job();

            job.Client_Id = jobBo.Client_Id;
            job.JobTitle = jobBo.JobTitle;
            job.Description = jobBo.Description;
            job.NoOfVacancies = jobBo.NoOfVacancies;
            job.Qualification = jobBo.Qualification;
            job.State = jobBo.State;
            job.City = jobBo.City;
            job.Status = jobBo.Status;
            job.PostingStatus = jobBo.PostingStatus;
            job.JobType_Id = jobBo.JobType_Id;
            job.Category_id = jobBo.Category_id;
            job.MaxSalary = jobBo.MaxSalary;
            job.MinSalary = jobBo.MinSalary;
            job.MaxExperience = jobBo.MaxExperience;
            job.MinExperience = jobBo.MinExperience;
            job.Skills = jobBo.Skills;
            job.User_Id = jobBo.User_Id;
            job.PostDate = DateTime.Now;
            job.CreatedBy = "Admin";
            job.CreateOn = DateTime.Now;
            job.UpdatedBy = "Admin";
            job.UpdatedOn = DateTime.Now;

            try
            {
                repository.Insert(job); repository.Save();
            }
            catch (Exception ex)
            {
            }




        }

        public void UpdateJob(int id, JobBo jobBo)
        {
            IGenericRepository<Job> repository = new GenericRepository<Job>();
            Job job = new Job();
            job.Id = jobBo.Id;
            job.Client_Id = jobBo.Client_Id;
            job.JobTitle = jobBo.JobTitle;
            job.Description = jobBo.Description;
            job.NoOfVacancies = jobBo.NoOfVacancies;
            job.Qualification = jobBo.Qualification;
            job.State = jobBo.State;
            job.City = jobBo.City;
            job.Status = jobBo.Status;
            job.PostingStatus = jobBo.PostingStatus;
            job.JobType_Id = jobBo.JobType_Id;
            job.Category_id = jobBo.Category_id;
            job.MaxSalary = jobBo.MaxSalary;
            job.MinSalary = jobBo.MinSalary;
            job.MaxExperience = jobBo.MaxExperience;
            job.MinExperience = jobBo.MinExperience;
            job.Skills = jobBo.Skills;
            job.User_Id = jobBo.User_Id;

            repository.Update(job);
            repository.Save();
        }
    }
}
