using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KenJobs.Bl.Contracts;
using KenJobs.Bl.Workers;
using KenJobs.Bo.BusinessObjects;
using KenJobs.Api.Models;

namespace KenJobs.Api.Controllers
{
    public class ApplyJobController : BaseController
    {
        // GET: api/ApplyJob
        public IHttpActionResult Get()
        {
            return Ok(new string[] { "value1", "value2" });
        }

        // GET: api/ApplyJob/5
        //insert applied job data 
        [Route("api/ApplyJob/{userId}")]
        public IHttpActionResult Get(int userId)
        {
            AppliedJobsContract appliedJobWorker = new AppliedJobsWorker();
            IEnumerable<JobBo> jobBoList = appliedJobWorker.GetAppliedJobsByUserId(userId);
            List<JobsModel> jobModelList = new List<JobsModel>();
            foreach (JobBo jobBo in jobBoList)
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
                jobsModel.ClientName = jobBo.ClientName;
                jobsModel.Currency = jobBo.Currency;
                jobsModel.Country = jobBo.Country;
                jobsModel.Skills = jobBo.Skills;
                jobsModel.AddressLine = jobBo.AddressLine;
                jobsModel.Status = jobBo.Status;

                JobTypeModel jobTypeModel = new JobTypeModel();
                JobTypeBo jobTypeBo = jobBo.JobType;
                jobTypeModel.Id = jobTypeBo.Id;
                jobTypeModel.Name = jobTypeBo.Name;
                jobTypeModel.Status = jobTypeBo.Status;

                jobsModel.JobType = jobTypeModel;

                JobCategoryModel jobCategoryModel = new JobCategoryModel();
                JobCategoryBo jobCategoryBo = jobBo.JobCategory;

                jobCategoryModel.Id = jobCategoryBo.Id;
                jobCategoryModel.Category = jobCategoryBo.Category;
                jobCategoryModel.Status = jobCategoryBo.Status;

                jobsModel.JobCategory = jobCategoryModel;


                jobModelList.Add(jobsModel);
            }

            return Ok(jobModelList);
        }

        // POST: api/ApplyJob
        [Authorize]
        [HttpPost]
        [Route("api/ApplyJob/apply")]
        public IHttpActionResult apply(AppliedJobModel jobmodel)
        {
            KenJobsSession s = GetKenJobsSession();

            AppliedJobsContract appliedJobsWorker = new AppliedJobsWorker();
            AppliedJobBo appliedJobBo = new AppliedJobBo();

            appliedJobBo.Job_Id = jobmodel.Job_Id;
            appliedJobBo.User_Id = s.User.Id;
            appliedJobBo.Client_Id =1;


            IEnumerable<AppliedJobBo> appliedJobBoList = appliedJobsWorker.GetAppliedJobs(appliedJobBo.Job_Id, appliedJobBo.User_Id);


            if (appliedJobBoList != null && appliedJobBoList.ToList().Count > 0)
            {
                return Ok(2);
            }
            else
            {
                int responce = appliedJobsWorker.PostAppliedJob(appliedJobBo);
                return Ok(responce);
            }

        }


        [Authorize]
        [HttpGet]
        [Route("api/ApplyJob/GetJobsByUserid")]
        public IHttpActionResult GetJobsByUserid()
        {
            KenJobsSession s = GetKenJobsSession();
            AppliedJobsContract appliedJobsWorker = new AppliedJobsWorker();
            IEnumerable<JobBo> jobBoList = appliedJobsWorker.GetAppliedJobsByUserId(s.User.Id);
            List<JobsModel> jobModelList = new List<JobsModel>();

            foreach (JobBo jobBo in jobBoList)
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
                jobsModel.ClientName = jobBo.ClientName;
                jobsModel.Currency = jobBo.Currency;
                jobsModel.Country = jobBo.Country;
                jobsModel.Skills = jobBo.Skills;
                jobsModel.AddressLine = jobBo.AddressLine;
                jobsModel.Status = jobBo.Status;

                JobTypeModel jobTypeModel = new JobTypeModel();
                JobTypeBo jobTypeBo = jobBo.JobType;
                jobTypeModel.Id = jobTypeBo.Id;
                jobTypeModel.Name = jobTypeBo.Name;
                jobTypeModel.Status = jobTypeBo.Status;
                jobsModel.JobType = jobTypeModel;

                JobCategoryModel jobCategoryModel = new JobCategoryModel();
                JobCategoryBo jobCategoryBo = jobBo.JobCategory;

                jobCategoryModel.Id = jobCategoryBo.Id;
                jobCategoryModel.Category = jobCategoryBo.Category;
                jobCategoryModel.Status = jobCategoryBo.Status;

                jobsModel.JobCategory = jobCategoryModel;
                jobModelList.Add(jobsModel);
            }
            return Ok(jobModelList);
        }


        // PUT: api/ApplyJob/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ApplyJob/5
        public void Delete(int id)
        {
        }
    }
}
