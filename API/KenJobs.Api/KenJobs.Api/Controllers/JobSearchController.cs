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
                jobsModel.Salary = jobBo.Salary;
                jobsModel.Qualification = jobBo.Qualification;
                jobsModel.State = jobBo.State;
                jobsModel.City = jobBo.City;
                jobsModel.PostDate = jobBo.PostDate;
                jobsModel.PostingStatus = jobBo.PostingStatus;
                jobsModel.JobType_Id = jobBo.JobType_Id;
                jobsModel.Category_id = jobBo.Category_id;
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
        public void Post([FromBody]string value)
        {
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
