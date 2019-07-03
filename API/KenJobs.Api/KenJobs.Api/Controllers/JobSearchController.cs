using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KenJobs.Api.Models;
using KenJobs.Bl.Workers;
using KenJobs.Bl.Contracts;
using KenJobs.Bo.BusinessObjects;

namespace KenJobs.Api.Controllers
{
    public class JobSearchController : ApiController
    {
        // GET: api/JobSearch
        public List<JobsModel> Get()
        {
            JobsContract jobsWorker = new JobsWorker();
            IEnumerable<JobBo> jobBoList = jobsWorker.GetJobs();
            List<JobsModel> jobModelList = new List<JobsModel>();
            foreach(JobBo jobBo in jobBoList)
            {
                JobsModel jobsModel = new JobsModel();
                jobsModel.Id = jobBo.Id;
                jobsModel.Client_Id = jobBo.Client_Id;
                jobsModel.JobTitle = jobBo.JobTitle;
                jobsModel.Description = jobBo.Description;
                jobsModel.NoOfVacancies = jobBo.NoOfVacancies;
                jobsModel.Qualification = jobBo.Qualification;
                jobsModel.State = jobBo.State;
                jobsModel.City = jobBo.City;
                jobsModel.PostDate = jobBo.PostDate;
                jobsModel.PostingStatus = jobBo.PostingStatus;
                jobsModel.JobType_Id = jobBo.JobType_Id;
                jobsModel.Category_id = jobBo.Category_id;
                jobsModel.MinSalary = jobBo.MinSalary;
                jobsModel.MaxSalary = jobBo.MaxSalary;
                jobsModel.MinExperience = jobBo.MinExperience;
                jobsModel.MaxExperience = jobBo.MaxExperience;
                jobsModel.User_Id = jobBo.User_Id;

                jobModelList.Add(jobsModel);
            }
            return jobModelList;
        }

        // GET: api/JobSearch/5
        //public List<JobsModel> Get(string Keyword,string location)
        //{
        //    JobsContract jobsWorker = new JobsWorker();


        //}

        // POST: api/JobSearch
        public void Post(JobsModel jobModel)
        {
            JobsContract jobsWorker = new JobsWorker();

            JobBo jobBo = new JobBo();

            jobBo.Client_Id = jobModel.Client_Id;
            jobBo.JobTitle = jobModel.JobTitle;
            jobBo.Description = jobModel.Description;
            jobBo.NoOfVacancies = jobModel.NoOfVacancies;
            jobBo.Qualification = jobModel.Qualification;
            jobBo.State = jobModel.State;
            jobBo.City = jobModel.City;
            jobBo.Status = jobModel.Status;
            jobBo.PostingStatus = jobModel.PostingStatus;
            jobBo.JobType_Id = jobModel.JobType_Id;
            jobBo.Category_id = jobModel.Category_id;
            jobBo.Skills = jobModel.Skills;
            jobBo.MinSalary = jobModel.MinSalary;
            jobBo.MaxSalary = jobModel.MaxSalary;
            jobBo.MinExperience = jobModel.MinExperience;
            jobBo.MaxExperience = jobModel.MaxExperience;
            jobBo.User_Id = jobModel.User_Id;

            jobsWorker.PostJob(jobBo);
        }

        // PUT: api/JobSearch/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/JobSearch/5
        public void Delete(int id)
        {
        }
    }
}
