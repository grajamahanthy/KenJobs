using KenJobs.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KenJobs.Bl.Contracts;
using KenJobs.Bl.Workers;
using KenJobs.Bo.BusinessObjects;
using System.Threading.Tasks;

namespace KenJobs.Api.Controllers
{
    public class JobController : ApiController
    {
        // GET: api/Job
        public IEnumerable<JobsModel> Get()
        {
            JobsContract Jobworker = new JobsWorker();
            IEnumerable<JobBo> jobBoList = Jobworker.GetJobs();

            List<JobsModel> jobModleList = new List<JobsModel>();

            foreach(JobBo jobBo in jobBoList)
            {
                JobsModel jobmodel = new JobsModel();

                jobmodel.Id = jobBo.Id;
                jobmodel.Client_Id = jobBo.Client_Id;
                jobmodel.JobTitle = jobBo.JobTitle;
                jobmodel.Description = jobBo.Description;
                jobmodel.NoOfVacancies = jobBo.NoOfVacancies;
                jobmodel.Qualification = jobBo.Qualification;
                jobmodel.State = jobBo.State;
                jobmodel.City = jobBo.City;
                jobmodel.PostDate = jobBo.PostDate;
                jobmodel.Status = jobBo.Status;
                jobmodel.PostingStatus = jobBo.PostingStatus;
                jobmodel.JobType_Id = jobBo.JobType_Id;
                jobmodel.Category_id = jobBo.Category_id;
                jobmodel.MinSalary = jobBo.MinSalary;
                jobmodel.MaxSalary = jobBo.MaxSalary;
                jobmodel.MinExperience = jobBo.MinExperience;
                jobmodel.MaxExperience = jobBo.MaxExperience;
                jobmodel.User_Id = jobBo.User_Id;
                jobModleList.Add(jobmodel);
            }
            return jobModleList;
        }
        // GET: api/Job/5
        public JobsModel Get(int id)
        {

            JobsContract Jobworker = new JobsWorker();
            JobBo jobBo = Jobworker.GetJob(id);

            JobsModel jobmodel = new JobsModel();

            jobmodel.Id = jobBo.Id;
            jobmodel.Client_Id = jobBo.Client_Id;
            jobmodel.JobTitle = jobBo.JobTitle;
            jobmodel.Description = jobBo.Description;
            jobmodel.NoOfVacancies = jobBo.NoOfVacancies;
            jobmodel.Qualification = jobBo.Qualification;
            jobmodel.State = jobBo.State;
            jobmodel.City = jobBo.City;
            jobmodel.PostDate = jobBo.PostDate;
            jobmodel.Status = jobBo.Status;
            jobmodel.PostingStatus = jobBo.PostingStatus;
            jobmodel.JobType_Id = jobBo.JobType_Id;
            jobmodel.Category_id = jobBo.Category_id;
            jobmodel.MinSalary = jobBo.MinSalary;
            jobmodel.MaxSalary = jobBo.MaxSalary;
            jobmodel.MinExperience = jobBo.MinExperience;
            jobmodel.MaxExperience = jobBo.MaxExperience;
            jobmodel.User_Id = jobBo.User_Id;

            return jobmodel;
        }

        // POST: api/Job
        public async Task<IHttpActionResult> Post(JobsModel jobmodel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            JobBo jobBo = new JobBo();

            jobBo.Id = jobmodel.Id;
            jobBo.Client_Id = jobmodel.Client_Id;
            jobBo.JobTitle = jobmodel.JobTitle;
            jobBo.Description = jobmodel.Description;
            jobBo.NoOfVacancies = jobmodel.NoOfVacancies;
            jobBo.Qualification = jobmodel.Qualification;
            jobBo.State = jobmodel.State;
            jobBo.City = jobmodel.City;
            jobBo.PostDate = jobmodel.PostDate;
            jobBo.Status = jobmodel.Status;
            jobBo.PostingStatus = jobmodel.PostingStatus;
            jobBo.JobType_Id = jobmodel.JobType_Id;
            jobBo.Category_id = jobmodel.Category_id;
            jobBo.MinSalary = jobmodel.MinSalary;
            jobBo.MaxSalary = jobmodel.MaxSalary;
            jobBo.MinExperience = jobmodel.MinExperience;
            jobBo.MaxExperience = jobmodel.MaxExperience;
            jobBo.User_Id = jobmodel.User_Id;

            JobsContract Jobworker = new JobsWorker();
             Jobworker.PostJob(jobBo);

            return Ok();
        }

        // PUT: api/Job/5
        public async Task<IHttpActionResult> Put(int id, JobsModel jobmodel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            JobBo jobBo = new JobBo();
            jobBo.Id = jobmodel.Id;
            jobBo.Client_Id = jobmodel.Client_Id;
            jobBo.JobTitle = jobmodel.JobTitle;
            jobBo.Description = jobmodel.Description;
            jobBo.NoOfVacancies = jobmodel.NoOfVacancies;
            jobBo.Qualification = jobmodel.Qualification;
            jobBo.State = jobmodel.State;
            jobBo.City = jobmodel.City;
            jobBo.PostDate = jobmodel.PostDate;
            jobBo.Status = jobmodel.Status;
            jobBo.PostingStatus = jobmodel.PostingStatus;
            jobBo.JobType_Id = jobmodel.JobType_Id;
            jobBo.Category_id = jobmodel.Category_id;
            jobBo.MinSalary = jobmodel.MinSalary;
            jobBo.MaxSalary = jobmodel.MaxSalary;
            jobBo.MinExperience = jobmodel.MinExperience;
            jobBo.MaxExperience = jobmodel.MaxExperience;
            jobBo.User_Id = jobmodel.User_Id;

            JobsContract Jobworker = new JobsWorker();

            Jobworker.UpdateJob(id, jobBo);

            return Ok();
        }

        // DELETE: api/Job/5
        public void Delete(int id)
        {
        }
    }
}
