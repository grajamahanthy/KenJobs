using KenJobs.Api.Models;
using KenJobs.Bl.Contracts;
using KenJobs.Bl.Workers;
using KenJobs.Bo.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KenJobs.Api.Controllers
{
    public class FavoriteJobController : BaseController
    {
        // GET: api/FavoriteJob
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/FavoriteJob/5
        public string Get(int id)
        {
            return "value";
        }
        [Authorize]
        [HttpPost]
        [Route("api/FavoriteJob/addToFavorite")]
        public IHttpActionResult addToFavorite(FavoriteJobModel jobmodel)
        {
            KenJobsSession s = GetKenJobsSession();

            FavoriteJobsContarct favoriteJobsWorker = new FavoriteJobsWorker();
            FavoriteJobBo FavoriteJobBo = new FavoriteJobBo();

            FavoriteJobBo.Job_Id = jobmodel.Job_Id;
            FavoriteJobBo.User_Id = s.User.Id;


            IEnumerable<FavoriteJobBo> FavoriteJobBoList = favoriteJobsWorker.GetFavoriteJobs(FavoriteJobBo.Job_Id, FavoriteJobBo.User_Id);


            if (FavoriteJobBoList != null && FavoriteJobBoList.ToList().Count > 0)
            {
                return Ok(2);
            }
            else
            {
                int responce = favoriteJobsWorker.PostFavoriteJob(FavoriteJobBo);
                return Ok(responce);
            }

        }


        [Authorize]
        [HttpGet]
        [Route("api/FavoriteJob/GetJobsByUserid")]
        public IHttpActionResult GetJobsByUserid()
        {
            KenJobsSession s = GetKenJobsSession();
            FavoriteJobsContarct favoriteJobsWorker = new FavoriteJobsWorker();
            IEnumerable<JobBo> jobBoList = favoriteJobsWorker.GetFavoriteJobsByUserId(s.User.Id);
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

        // POST: api/FavoriteJob
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/FavoriteJob/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/FavoriteJob/5
        public void Delete(int id)
        {
        }
    }
}
